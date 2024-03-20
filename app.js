const { createApp, ref } = Vue;

const vueIntance = createApp({
  setup() {
    const message = ref('Hello vue!');
    const title = 'Asdasds';

    const todoList = [
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
    ];

    return {
      message,
      title,
      todoList,
    };
  },
});

vueIntance.mount('#app');
