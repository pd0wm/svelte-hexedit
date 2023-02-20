import { publish } from 'gh-pages';

publish(
    'build',
    {
        branch: 'gh-pages',
        repo: 'git@github.com:pd0wm/svelte-hexedit.git',
        user: {
            name: 'Willem Melching',
            email: 'willem.melching@gmail.com'
        },
        dotfiles: true,
        history: false
    },
    () => {
        console.log('Deploy Complete!');
    }
);
