# shortcuts

This package provides two main services:

- Register and unregister short cuts
- Register and unregister shortcut packs (more interesting)

## Register & unregister short cuts

```ts
import {ShortCut, shortCutter} from "@rozbehsharahi/shortcuts";

// set a short cut
shortCutter.register('my-control-save', new ShortCut({
    ctrl: true,
    key: s,
    action: () => alert('wooohooo')
}))

// Use name to unset
shortCutter.unregister('my-control-save')
```

## Register & unregister packs

In fact, we work here with stacks, and it should rather be called: Push & pop shortcut packs.

Scenario: Imagine you have an app for todos. The tool is only accessible via Login and you want to provide a shortcut
via Escape key to log out. While this sounds straightforward, imagine you have also a plus button for adding a new todo.
When clicking that plus button a modal pops up. Here you no longer want Esc to stand for "Log out" you want it rather to
be the shortcut for canceling the modal. But after closing the modal you want to go back to your default escape shortcut
again.

This scenario made me create the shortcut packs, where every modal, component, view can stack an entire new pack of
shortcuts, which can be simply removed again.

```ts
import {ShortCut, shortPacker} from "@rozbehsharahi/shortcuts";

// Set shortcuts
shortPacker.push([
    new ShortCut({
        label: 'My escape in Todo-List-View',
        key: 'Escape',
        action: () => save()
    })
])

// Temporarily replace shortcuts
shortPacker.push([
    new ShortCut({
        label: 'My escape in Todo-Add-View',
        key: 'Escape',
        action: () => cancel()
    })
])

// Jump back to initial shortcuts
shortPacker.pop();
```

## Publishing

- Program
- Commit changes
- Update npm package version
- Commit
- Push
- Create release

## Know issues

- Written in TypeScript. You need a tool like webpack, vue-cli or whatever to make this package accessible for yourself.