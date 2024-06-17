import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddEditLimitModal.module.scss';
import { useTranslation } from 'react-i18next';
import { BudgetItemCarusel } from 'entities/Budget';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getAddEditLimitAmount, getAddEditLimitCategory, getAddEditLimitError, getAddEditLimitIsLoading } from '../model/selectors/addEditLimit';
import toast from 'react-hot-toast';
import { addEditLimitActions, addEditLimitReducer } from '../model/slice/addEditBudgetSlice';
import { addLimit } from '../model/services/addLimit';
import { Modal } from 'shared/ui/Modal';
import Input from 'shared/ui/Input/ui/Input';
import { Button, ThemeButton } from 'shared/ui/Button';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DinamicModuleLoader';
import { EditLimitDto } from '../model/types/addEditLimitSchema';
import { editLimit } from '../model/services/editLimit';
import { CategoryDto, categoryReducer, fetchCategory, getUserCategories } from 'entities/Category';
import { Limit } from 'entities/Limit';
import Select, { SelectOption } from 'shared/ui/Select/ui/Select';
import { categoryIconOptions } from 'shared/const/common';

const initialReducers: ReducersList = {
  addEditLimit: addEditLimitReducer,
  category: categoryReducer
};

export interface AddEditLimitModalProps {
  isOpen: boolean
  onClose: () => void
  isEdit: boolean
  limitData: Limit
  currentBudget: BudgetItemCarusel
  className?: string
}

const AddEditLimitModal: FC<AddEditLimitModalProps> = (props) => {
  const { className, isOpen, onClose, isEdit, limitData, currentBudget } = props;

  const { t } = useTranslation(['limits', 'category']);

  const dispatch = useAppDispatch();

  const categories = useSelector(getUserCategories.selectAll);

  const categoryId = useSelector(getAddEditLimitCategory);
  const amount = useSelector(getAddEditLimitAmount);
  const isLoading = useSelector(getAddEditLimitIsLoading);
  const error = useSelector(getAddEditLimitError);

  const [amountError, setAmountError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [limitChanges, setLimitChanges] = useState({});

  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>();
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('');

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  useEffect(() => {
    if (isEdit && limitData) {
      dispatch(addEditLimitActions.setCategory(limitData.category.id));
      dispatch(addEditLimitActions.setAmount(limitData.amount));
    }
  }, [isEdit, limitData]);

  useEffect(() => {
    if (isEdit && limitData) {
      const changes = getLimitChanges();
      setLimitChanges(changes);
    }
  }, [categoryId, amount]);

  useEffect(() => {
    if (!categoryId || !amount || amountError) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [categoryId, amount, amountError]);

  useEffect(() => {
    let options = [{
      value: 'new', content: t('category:newCategory'), icon: 'plus'
    }];
    if (categories.length > 0) {
      const categoryByType = categories.filter((item) => item.type === 'expense').map(item => ({
        value: item.id,
        content: t(`category:${item.name}`),
        icon: item.icon ? item.icon : undefined
      }));
      options = [...options, ...categoryByType];
    }
    setCategoryOptions(options);
  }, [categories]);

  useEffect(() => {
    if (categories.length > 0 && categoryOptions && categoryOptions.length > 1) {
      dispatch(addEditLimitActions.setCategory(categoryOptions[1].value));
    }
  }, [categories, categoryOptions]);

  useEffect(() => {
    if (categoryId === 'new') {
      setIsNewCategory(true);
    } else {
      setIsNewCategory(false);
    }
  }, [categoryId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onChangeCategoryId = useCallback(
    (value: string) => {
      dispatch(addEditLimitActions.setCategory(value));
    },
    [dispatch]
  );

  const onChangeAmount = useCallback(
    (value: string) => {
      dispatch(addEditLimitActions.setAmount(Number(value)));
    },
    [dispatch]
  );

  const onChangeNewCategoryName = useCallback(
    (value: string) => {
      setNewCategoryName(value);
    },
    []
  );

  const onChangeNewCategoryIcon = useCallback(
    (value: string) => {
      setNewCategoryIcon(value);
    },
    []
  );

  const onCloseModal = () => {
    onClose();
    dispatch(addEditLimitActions.resetState());
    setAmountError('');
  };

  const onAddEditLimit = useCallback(
    () => {
      const newCategory: CategoryDto = isNewCategory ? { name: newCategoryName, type: 'expense', icon: newCategoryIcon } : undefined;
      if (isEdit) {
        if (Object.keys(limitChanges).length === 0) {
          onCloseModal();
          return;
        }

        dispatch(editLimit({ id: limitData.id, budgetId: currentBudget.id, ...limitChanges })).then(() => {
          onCloseModal();
        });
        return;
      }

      dispatch(addLimit({ categoryId, budgetId: currentBudget.id, amount, category: newCategory })).then(() => {
        onCloseModal();
      });
    },
    [dispatch, isEdit, categoryId, amount, limitChanges, currentBudget]
  );

  const getLimitChanges = () => {
    const differences: Omit<EditLimitDto, 'id' | 'budgetId' | 'categoryId'> = {};

    // Сравниваем поля и добавляем изменения в новый объект
    if (limitData.amount !== amount) differences.amount = amount;

    return differences;
  };

  return (
    <DynamicModuleLoader reducers={initialReducers}>
    <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        title={isEdit ? t('modal.titleEdit') : t('modal.titleAdd')}
        subtitle={t('modal.subtitle')}
        className={classNames(cls.addBudgetModal, {}, [className])}
      >
        <div className={cls.formWrapper}>
          {!isEdit && (
            <>
            <Select
              label={t('modal.labelCategory')}
              value={categoryId}
              options={categoryOptions}
              onChange={onChangeCategoryId}
            />
            {isNewCategory && (
              <>
                <Input
                  value={newCategoryName}
                  onChange={onChangeNewCategoryName}
                  label={t('category:labelName')}
                  placeholder={t('category:placeholderName')}
                />
                <Select
                  label={t('category:labelIcon')}
                  value={newCategoryIcon}
                  options={categoryIconOptions}
                  onChange={onChangeNewCategoryIcon}
                />
              </>
            )}
            </>
          )}
            <Input
                value={amount}
                onChange={onChangeAmount}
                required
                maskOptions={{
                  mask: Number,
                  scale: 2,
                  thousandsSeparator: ' '
                }}
                error={amountError}
                setError={setAmountError}
                errorText={t('modal.errorAmount')}
                label={t('modal.labelAmount')}
                placeholder={t('modal.placeholderAmount')}
            />
        </div>
        <div className={cls.buttonWrapper}>
          <Button
            theme={ThemeButton.PRIMARY}
            disabled={disabledBtn}
            loading={isLoading}
            className={cls.button}
            onClick={onAddEditLimit}
          >
              {isEdit ? t('modal.buttonEdit') : t('modal.buttonCreate')}
          </Button>
        </div>
      </Modal>
      </DynamicModuleLoader>
  );
};

export default AddEditLimitModal;
