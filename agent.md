# Agent Reference File - Product Management System

## Project Overview

This is a React + Supabase product management system using:

- **Frontend**: React 19, TypeScript, Vite
- **State Management**: Redux Toolkit with RTK Query
- **Backend**: Supabase (PostgreSQL)
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Base UI (shadcn-style components)
- **Styling**: Tailwind CSS v4

## Project Structure

```
src/
├── api/                    # RTK Query API definitions
│   ├── categories.ts       # Categories CRUD API
│   └── products.ts         # Products CRUD API
├── components/
│   └── ui/                 # Reusable UI components (Button, Dialog, Select, Input, etc.)
├── helpers/
│   └── validationSchema.ts # Zod validation schemas
├── lib/
│   ├── cn.ts              # Class name utility
│   └── supabaseClient.ts  # Supabase client configuration
├── Pages/
│   ├── Categories/        # Categories page and modals
│   └── Products/          # Products page and modals
├── slices/                # Redux slices (if any)
├── store/
│   └── index.ts           # Redux store configuration
└── types/
    ├── categories/
    │   └── categories-reducer.ts
    └── products/
        ├── products-api.ts
        └── products-reducer.ts
```

## Key Files Analysis

### 1. Product Types (`src/types/products/products-reducer.ts`)

```typescript
export interface IProduct {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  price: number;
  qty: number;
  category_id: number;
}
```

### 2. Product API Types (`src/types/products/products-api.ts`)

```typescript
export type IAddProduct = Omit<IProduct, "id" | "created_at" | "updated_at">;
export type IUpdateProduct = IAddProduct & Pick<IProduct, "id">;
```

### 3. Validation Schema (`src/helpers/validationSchema.ts`)

```typescript
export const addProductSchema = zod.object({
  name: zod.string().trim().nonempty("Name is required"),
  price: zod.number().gte(1).nonnegative().nonoptional("Price is required"),
  qty: zod.number().gte(1).nonnegative().nonoptional("Quantity is required"),
  category_id: zod
    .number("Category is required")
    .nonoptional("Category is required"),
});
```

### 4. AddProductModal (`src/Pages/Products/modals/AddProductModal.tsx`)

Current fields:

- **name** (text input)
- **price** (number input)
- **qty** (number input)
- **category_id** (select dropdown - already integrated with React Hook Form via Controller)

### 5. Supabase Tables (inferred from API)

- **Products**: id, name, price, qty, category_id, created_at, updated_at
- **Categories**: id, name, created_at, updated_at

## Current State of AddProductModal

The modal already has:

- ✅ React Hook Form integration with `useForm`
- ✅ Zod validation via `zodResolver`
- ✅ Controller for all fields (name, price, qty, category_id)
- ✅ Category select dropdown using the custom Select component
- ✅ Create/Update product mutations via RTK Query

## Task Requirements

1. **Add fields in AddProductModal for adding new product** - Need to check what additional fields might be needed
2. **Update the add product modal by integrating react hook form in the commented select** - The select is already integrated with React Hook Form via Controller. Need to check if there's a commented version or if the user wants a different implementation.

## Do's and Don'ts

### Do's

- Use `Controller` from react-hook-form for controlled components
- Use `zodResolver` for validation
- Follow existing patterns in the codebase
- Use the custom UI components (Select, Input, Field, etc.)
- Handle both create and update scenarios
- Reset form on modal close

### Don'ts

- Don't use uncontrolled components with react-hook-form
- Don't bypass validation
- Don't mutate state directly
- Don't forget to handle loading/error states
- Don't hardcode values that should come from API

## Code Patterns

### Form Field Pattern (Controller)

```tsx
<Controller
  control={control}
  name="fieldName"
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <Label htmlFor="fieldName">Label</Label>
      <Input
        {...field}
        id="fieldName"
        name="fieldName"
        type="text"
        placeholder="Placeholder"
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
```

### Select Field Pattern

```tsx
<Controller
  name="category_id"
  control={control}
  render={({ field, fieldState }) => (
    <Field>
      <Label htmlFor="category_id">Category</Label>
      <Select
        {...field}
        items={categoriesList}
        value={
          categoriesList?.find((item) => item.value === field.value)?.label ??
          ""
        }
        onValueChange={(value) => field.onChange(Number(value))}
        data-invalid={fieldState.invalid}
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categoriesList?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
```

## Environment Variables

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase publishable key

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run oxlint
- `npm run preview` - Preview production build
