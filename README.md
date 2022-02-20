# shortcuts

My personal shortcut library.

This package provides two main services:

- Register and unregister short cuts
- Register and unregister shortcut packs (more interesting)

## Register & unregister short cuts

```ts
import {shortCutter} from "@rozbehsharahi/shortcuts";

shortCutter.register('my-control-save', 'ctrl+s', () => alert('hey'))
shortCutter.unregister('my-control-save')

// or

shortCutter.register('my-q', 'q', () => alert('you pressed q'))
shortCutter.unregister('my-q', 'q', () => alert('you pressed q'))
```

## Register & unregister packs

In fact, we work here with stacks, and it should rather be called: Push & pop shortcut packs.

Scenario: Imagine you have an app for todos. The tool is only accessible via Login and you want to provide a shortcut
via Escape key to log out. While this sound straightforward imagine you have also a plus button for adding a new todo.
When clicking that log button a modal pops up. Though here you don't want Esc to stand for "Log out" you want it rather
to be the shortcut for canceling the modal.

This scenario made me create the short cut packs, where every modal, component, view can stack a entire new pack of
shortcuts, which can be simply remove again via popping.

```ts
import {ShortCut, shortPacker} from "@rozbehsharahi/shortcuts";

shortPacker.push([
    {
        label: 'My Escape in Todo List view',
        shortCut: new ShortCut({key: 'Escape'}),
        method: logout()
    }
])

// some code to open a modal for adding new todo
shortPacker.push([
    {
        label: 'My Escape in Add new Todo view',
        shortCut: new ShortCut({key: 'Escape'}),
        method: closeAddNewTodoView()
    }
])

// after save of your new todo you can call pop to jump to the pack before
shortPacker.pop(); // now the first pack with Esc to logout is active again. :)


```

## Know issues

- Written in TypeScript. You need a tool like webpack, vue-cli or whatever to make this package accessible for yourself.