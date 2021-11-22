# React-right-click-menu

A custom context menu with a default styles but u can modify it and set ur style

## Installation

```
npm i react-right-click-context-menu
```

also You can clone it

```
  git clone https://github.com/amirho1/react-right-click-context-menu
```

then

## Installing Dependencies

```
  npm i
```

## test

```
  npm run test
```

## Demo

```
  npm run serve
```

## Build

after getting build you need to copy the scss files in to their files in dist for example MapLI.scss and RightClickMenu.scss

```
npm run build
```

## Example

```javascript
<RightClickMenu
  menuClassName="menu-demo"
  liClassName="something"
  rightClickTargets={[
    {
      className: "demo-right",
      menuList: [
        <a
          href="https://github.com/amirho1/react-right-click-menu.git"
          target="_blank">
          <i className="fab fa-github"></i> github
        </a>,
        <a target="_blank">
          <i className="fas fa-paste"></i> Copy
        </a>,
        <a>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">checkbox</label>
        </a>,
      ],
    },
    {
      className: "demo-left",
      menuList: [
        <a
          href="https://www.linkedin.com/in/amirhossien-salighedar-8b165618a/"
          target="_blank">
          <i className="fab fa-linkedin"></i> linkedin
        </a>,
        <a href="#" target="_blank">
          <i className="fas fa-paste"></i> Paste
        </a>,
        <span>
          {" "}
          <i className="fas fa-trash"></i> delete
        </span>,
      ],
    },
  ]}
/>
```

## Demo Example

```javascript
export default function Demo() {
  return (
    <div className="demo">
      <RightClickMenu
        menuClassName="menu-demo"
        rightClickTargets={[
          {
            className: "demo-right",
            menuList: [
              <a
                href="https://github.com/amirho1/react-right-click-menu.git"
                target="_blank">
                <i className="fab fa-github"></i> github
              </a>,
              <a target="_blank">
                <i className="fas fa-paste"></i> Copy
              </a>,
              <a>
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">checkbox</label>
              </a>,
            ],
          },
          {
            className: "demo-left",
            menuList: [
              <a
                href="https://www.linkedin.com/in/amirhossien-salighedar-8b165618a/"
                target="_blank">
                <i className="fab fa-linkedin"></i> linkedin
              </a>,
              <a href="#" target="_blank">
                <i className="fas fa-paste"></i> Paste
              </a>,
              <span>
                {" "}
                <i className="fas fa-trash"></i> delete
              </span>,
            ],
          },
        ]}
      />

      <div className="demo-left">
        <div className="description">
          <h1>React-right-click-menu</h1>
          <p className="text">
            React right click menu is a library to help developer focus on the
            main concept it supports{" "}
            <a href="https://www.typescriptlang.org/">Typescript</a> also
            <a href="">Javascript</a>
            click on sides to see the default style and behavior of menu for
            further reading go to repository
          </p>

          <h2>
            <a href="https://github.com/amirho1/react-right-click-menu">
              Repository
            </a>
          </h2>

          <h2>
            Author :{" "}
            <a href="https://www.linkedin.com/in/amirhossien-salighedar-8b165618a/">
              {" "}
              AmirHossein Salighedar
            </a>
          </h2>
        </div>
      </div>
      <div className="demo-right"></div>
    </div>
  );
}
```

## Properties

| Name                   | Type                                               | Description                                                                                                                                                  |
| ---------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| rightClickTargets      | {className: string, menuList: element or string}[] | targets that we want to have contextMenu it's required and className is name of targets that library should follow them, menuList is context menu list Items |
| menuClassName          | string                                             | className of UL the (wrapper)                                                                                                                                |
| liClassName            | string                                             | className of each LI inside UL                                                                                                                               |
| preventDefaultOnWindow | boolean                                            | by default true preventsFrom right click on window                                                                                                           |

## License

[MIT](./LICENSE)

## Author

[Xerxes (AmirHossein Salighedar)](https://github.com/amirho1)
