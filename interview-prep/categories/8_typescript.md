# Category 8: TypeScript for Automation (10 Questions)

## --- EASY ---

## 1. What is TypeScript and what are its main advantages over JavaScript?
**Answer:** TypeScript is a strongly typed superset of JavaScript that compiles to plain JS. Its main advantages include **Static Typing** (catching errors at compile-time), **IntelliSense/Autocompletion** (better developer experience), and **Better Refactoring** (safer to change code across large projects).

## 2. What are the basic types available in TypeScript?
**Answer:** The primary types are `string`, `number`, `boolean`, `array` (e.g., `string[]`), `tuple`, `enum`, `any`, `void`, `null`, and `undefined`.

## 3. What is the difference between an Interface and a Type Alias?
**Answer:** Both are used to define the shape of an object. However, **Interfaces** are better for defining object structures and can be "merged" (declaration merging), whereas **Types** are more flexible and can define unions, primitives, and intersections. In automation, Interfaces are the standard for POM class structures.

## 4. Why should the `any` type be avoided in automation scripts?
**Answer:** Using `any` effectively turns off type-checking, defeating the purpose of TypeScript. It hides potential bugs, removes autocompletion, and makes the code harder to maintain. It is better to use `unknown` if the type is truly unknown, as it forces a type check before use.

## 5. How do you define optional properties in a TypeScript interface?
**Answer:** You use the question mark `?` after the property name. For example:
```typescript
interface User {
  username: string;
  password?: string; // Optional field
}
```

## --- MEDIUM ---

## 6. What are Generics and how do you use them in a test framework?
**Answer:** Generics allow you to create reusable components that work with a variety of types. In automation, I use them for generic "Base Page" methods. For example, a method that waits for a specific Page Object to load:
```typescript
async function waitForPage<T>(pageClass: new (page: Page) => T): Promise<T> { ... }
```

## 7. Explain Union Types vs. Intersection Types.
**Answer:** 
- **Union (`|`):** A value can be one of several types (e.g., `string | number`). Useful for a function that accepts multiple locator types.
- **Intersection (`&`):** Combines multiple types into one. A value must satisfy all types. Useful for combining a base user object with specific permissions (e.g., `User & AdminPermissions`).

## 8. What are Enums and when should you use them over Union Types?
**Answer:** Enums allow you to define a set of named constants. I use Enums for fixed, stable sets of values like `Environment` (DEV, STAGE, PROD). However, for simple string sets, I prefer **Union Types** (e.g., `'active' | 'inactive'`) because they are more lightweight and don't require extra runtime code.

## --- HARD ---

## 9. Explain TypeScript Utility Types (Partial, Readonly, Pick, Record).
**Answer:** These are built-in types that transform existing types:
- **Partial<T>:** Makes all properties in T optional (great for update-user API tests).
- **Readonly<T>:** Makes all properties immutable.
- **Pick<T, K>:** Creates a type by picking a set of properties K from T.
- **Record<K, T>:** Constructs an object type with keys K and values T (useful for mapping error codes to messages).

## 10. What are Mapped Types and how can they be useful in a large-scale POM?
**Answer:** Mapped types allow you to create new types based on old ones by "mapping" over the keys. In a large POM, I can use them to automatically generate a type that represents the "Loading State" or "Validation State" of every field in a form interface, ensuring that my automation state-tracking is always in sync with the UI model.
