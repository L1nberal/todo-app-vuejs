const { createApp, ref } = Vue;

const vueIntance = createApp({
  setup() {
    const todoList = ref([
      {
        id: '1',
        title: 'Learning English',
        createdAt: '20/03/2024',
        deadline: '26/03/2024',
      },
      {
        id: '2',
        title: 'Doing household chores',
        createdAt: '20/03/2024',
        deadline: '26/03/2024',
      },
      {
        id: '3',
        title: 'Doing the laundry',
        createdAt: '20/03/2024',
        deadline: '26/03/2024',
      },
      {
        id: '4',
        title: 'Doing the dishes',
        createdAt: '20/03/2024',
        deadline: '26/03/2024',
      },
    ]);

    const handleOnSubmit = (event) => {
      const formData = new FormData(event.target);

      const [todo] = formData.values();

      todoList._value.push({
        id: todo,
        title: todo,
        createdAt: '20/03/2024',
        deadline: '26/03/2024',
      });

      event.target.reset();
    };

    return {
      todoList,
      handleOnSubmit,
    };
  },
});

vueIntance.mount('#app');
