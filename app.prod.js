const { createApp, ref } = Vue;

const vueIntance = createApp({
  setup() {
    const todoList = ref(JSON.parse(localStorage.getItem('todoList') ?? '[]'));

    const importantTasks = ref(
      JSON.parse(localStorage.getItem('importantTasks') ?? '[]')
    );

    const handleUpdateLocal = (array, key) => {
      localStorage.setItem(key, JSON.stringify(array));
    };

    const handleReorderItems = (_item) => {
      let array;
      let itemIndex;

      if (_item.isImportant) {
        array = importantTasks._value;
      } else {
        array = todoList._value;
      }

      itemIndex = array.indexOf(_item);
      array.splice(itemIndex, 1);
      array.push(_item);
    };

    function guidGenerator() {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
      );
    }

    const handleOnSubmit = (event) => {
      const formData = new FormData(event.target);

      const [todo] = formData.values();

      todoList._value.unshift({
        id: guidGenerator(),
        title: todo,
        createdAt: '20/03/2024',
        deadline: '26/03/2024',
        isDone: false,
        isImportant: false,
        isMenuOpened: false,
      });

      handleUpdateLocal(todoList._value, 'todoList');

      event.target.reset();
    };

    const handleToggleImportant = (_item) => {
      if (!_item.isImportant) {
        _item.isImportant = true;
        const itemIndex = todoList._value.indexOf(_item);

        if (!_item.isDone) {
          importantTasks._value.unshift(_item);
        } else {
          importantTasks._value.push(_item);
        }

        todoList._value.splice(itemIndex, 1);

        handleUpdateLocal(importantTasks._value, 'importantTasks');
        handleUpdateLocal(todoList._value, 'todoList');
      } else {
        _item.isImportant = false;
        const itemIndex = importantTasks._value.indexOf(_item);

        if (!_item.isDone) {
          todoList._value.unshift(_item);
        } else {
          todoList._value.push(_item);
        }

        importantTasks._value.splice(itemIndex, 1);

        handleUpdateLocal(todoList._value, 'todoList');
        handleUpdateLocal(importantTasks._value, 'importantTasks');
      }
    };

    const handleToggleDone = (_item) => {
      _item.isDone = !_item.isDone;

      if (_item.isDone) {
        handleReorderItems(_item);
      }

      handleUpdateLocal(todoList._value, 'importantTasks');
    };

    const handleOpenMenu = (event, _item) => {
      setTimeout(() => {
        _item.isMenuOpened = !_item.isMenuOpened;
      }, 100);

      handleCheckBtnFocused(event.currentTarget, _item);
    };

    const handleCheckBtnFocused = (el, _item) => {
      const handleBlur = () => {
        setTimeout(() => {
          _item.isMenuOpened = !_item.isMenuOpened;
        }, 100);

        el.removeEventListener('blur', handleBlur);
      };

      el.addEventListener('blur', handleBlur);
    };

    const handleDelete = (_item) => {
      let array;
      let key;

      if (!_item.isImportant) {
        array = todoList._value;
        key = 'todoList';
      } else {
        array = importantTasks._value;
        key = 'importantTasks';
      }

      const itemIndex = array.indexOf(_item);

      array.splice(itemIndex, 1);

      console.log(key);

      handleUpdateLocal(array, key);
    };

    return {
      todoList,
      importantTasks,
      handleOnSubmit,
      handleToggleDone,
      handleToggleImportant,
      handleOpenMenu,
      handleDelete,
    };
  },
});

vueIntance.mount('#app');
