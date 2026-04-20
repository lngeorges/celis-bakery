'use client';

import { useCallback, useEffect, useState } from 'react';

type Tab = 'products' | 'ingredients' | 'recipe-items';

interface Product {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  batch: number;
  productPrice: number;
  priceBreakQuantity: number | null;
  priceBreakDiscount: number | null;
  bakeTime: number;
  isAvailable: boolean;
}

interface Ingredient {
  id: string;
  name: string;
  cost: number;
  ingredientMinimum: number;
  ingredientPurchaseMeasure: string;
  ingredientPurchaseQuantity: number;
}

interface RecipeItem {
  id: string;
  productId: string;
  ingredientId: string;
  measure: number;
  recipeMeasure: string;
  recipeMeasureQty: number;
  product?: Product;
  ingredient?: Ingredient;
}

interface Toast {
  id: number;
  message: string;
  kind: 'success' | 'error';
}

let toastId = 0;

async function apiFetch(path: string, init?: RequestInit) {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? `Request failed with status ${response.status}`);
  }

  return payload;
}

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

function NumberField({
  label,
  value,
  onChange,
  step = 'any',
  optional = false,
}: {
  label: string;
  value: number | '';
  onChange: (value: number | '') => void;
  step?: string;
  optional?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-wood-800">
      <span>
        {label}
        {optional && <span className="ml-1 text-xs text-wood-500">(optional)</span>}
      </span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(event) => {
          const next = event.target.value;
          onChange(next === '' ? '' : Number(next));
        }}
        className="w-full rounded border border-cream-300 bg-white px-3 py-2 text-wood-900 focus:outline-none focus:ring-2 focus:ring-burgundy-400"
      />
    </label>
  );
}

function ProductForm({
  initial,
  loading,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<Product>;
  loading?: boolean;
  onSubmit: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [category, setCategory] = useState(initial?.category ?? 'Bread');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [batch, setBatch] = useState<number | ''>(initial?.batch ?? '');
  const [productPrice, setProductPrice] = useState<number | ''>(initial?.productPrice ?? '');
  const [priceBreakQuantity, setPriceBreakQuantity] = useState<number | ''>(
    initial?.priceBreakQuantity ?? '',
  );
  const [priceBreakDiscount, setPriceBreakDiscount] = useState<number | ''>(
    initial?.priceBreakDiscount ?? '',
  );
  const [bakeTime, setBakeTime] = useState<number | ''>(initial?.bakeTime ?? '');
  const [isAvailable, setIsAvailable] = useState(initial?.isAvailable ?? true);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          name: name.trim(),
          category,
          description: description.trim(),
          batch,
          productPrice,
          priceBreakQuantity,
          priceBreakDiscount,
          bakeTime,
          isAvailable,
        });
      }}
      className="rounded-lg border border-cream-200 bg-cream-50 p-5"
    >
      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm font-medium text-wood-800">
            Product Name *
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded border border-cream-300 bg-white px-3 py-2 text-wood-900 focus:outline-none focus:ring-2 focus:ring-burgundy-400"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-wood-800">
            Category *
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded border border-cream-300 bg-white px-3 py-2 text-wood-900 focus:outline-none focus:ring-2 focus:ring-burgundy-400"
            >
              <option value="Bread">Bread</option>
              <option value="Muffins and Scones">Muffins and Scones</option>
              <option value="Cookies">Cookies</option>
              <option value="Pastries">Pastries</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm font-medium text-wood-800">
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            className="rounded border border-cream-300 bg-white px-3 py-2 text-wood-900 focus:outline-none focus:ring-2 focus:ring-burgundy-400"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-3">
          <NumberField label="Batch Size *" value={batch} onChange={setBatch} />
          <NumberField
            label="Price per Batch *"
            value={productPrice}
            onChange={setProductPrice}
            step="0.01"
          />
          <NumberField
            label="Bake Time (min) *"
            value={bakeTime}
            onChange={setBakeTime}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <NumberField
            label="Discount Threshold"
            value={priceBreakQuantity}
            onChange={setPriceBreakQuantity}
            optional
          />
          <NumberField
            label="Discount %"
            value={priceBreakDiscount}
            onChange={setPriceBreakDiscount}
            step="0.01"
            optional
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-wood-800">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(event) => setIsAvailable(event.target.checked)}
            className="h-4 w-4 rounded border-cream-300 text-burgundy-800 focus:ring-burgundy-400"
          />
          Available on site
        </label>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-burgundy-800 px-5 py-2 text-sm font-medium text-cream-100 transition-colors hover:bg-burgundy-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Saving…' : initial?.id ? 'Update Product' : 'Create Product'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded bg-cream-200 px-5 py-2 text-sm font-medium text-wood-800 transition-colors hover:bg-cream-300"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function IngredientForm({
  initial,
  loading,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<Ingredient>;
  loading?: boolean;
  onSubmit: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [cost, setCost] = useState<number | ''>(initial?.cost ?? '');
  const [ingredientMinimum, setIngredientMinimum] = useState<number | ''>(
    initial?.ingredientMinimum ?? '',
  );
  const [ingredientPurchaseMeasure, setIngredientPurchaseMeasure] = useState(
    initial?.ingredientPurchaseMeasure ?? '',
  );
  const [ingredientPurchaseQuantity, setIngredientPurchaseQuantity] = useState<number | ''>(
    initial?.ingredientPurchaseQuantity ?? '',
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          name: name.trim(),
          cost,
          ingredientMinimum,
          ingredientPurchaseMeasure: ingredientPurchaseMeasure.trim(),
          ingredientPurchaseQuantity,
        });
      }}
      className="rounded-lg border border-cream-200 bg-cream-50 p-5"
    >
      <div className="grid gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-wood-800">
          Ingredient Name *
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded border border-cream-300 bg-white px-3 py-2 text-wood-900 focus:outline-none focus:ring-2 focus:ring-burgundy-400"
          />
        </label>

        <NumberField label="Cost per Unit *" value={cost} onChange={setCost} step="0.0001" />

        <div className="grid gap-4 md:grid-cols-3">
          <NumberField
            label="Minimum (grams) *"
            value={ingredientMinimum}
            onChange={setIngredientMinimum}
          />
          <label className="flex flex-col gap-1 text-sm font-medium text-wood-800">
            Purchase Unit *
            <input
              required
              value={ingredientPurchaseMeasure}
              onChange={(event) => setIngredientPurchaseMeasure(event.target.value)}
              className="rounded border border-cream-300 bg-white px-3 py-2 text-wood-900 focus:outline-none focus:ring-2 focus:ring-burgundy-400"
              placeholder="e.g. pounds"
            />
          </label>
          <NumberField
            label="Purchase Quantity *"
            value={ingredientPurchaseQuantity}
            onChange={setIngredientPurchaseQuantity}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-burgundy-800 px-5 py-2 text-sm font-medium text-cream-100 transition-colors hover:bg-burgundy-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Saving…' : initial?.id ? 'Update Ingredient' : 'Create Ingredient'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded bg-cream-200 px-5 py-2 text-sm font-medium text-wood-800 transition-colors hover:bg-cream-300"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function RecipeItemForm({
  initial,
  products,
  ingredients,
  loading,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<RecipeItem>;
  products: Product[];
  ingredients: Ingredient[];
  loading?: boolean;
  onSubmit: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
}) {
  const [productId, setProductId] = useState(initial?.productId ?? '');
  const [ingredientId, setIngredientId] = useState(initial?.ingredientId ?? '');
  const [measure, setMeasure] = useState<number | ''>(initial?.measure ?? '');
  const [recipeMeasure, setRecipeMeasure] = useState(initial?.recipeMeasure ?? '');
  const [recipeMeasureQty, setRecipeMeasureQty] = useState<number | ''>(
    initial?.recipeMeasureQty ?? '',
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          productId,
          ingredientId,
          measure,
          recipeMeasure: recipeMeasure.trim(),
          recipeMeasureQty,
        });
      }}
      className="rounded-lg border border-cream-200 bg-cream-50 p-5"
    >
      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm font-medium text-wood-800">
            Product *
            <select
              required
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
              className="rounded border border-cream-300 bg-white px-3 py-2 text-wood-900 focus:outline-none focus:ring-2 focus:ring-burgundy-400"
            >
              <option value="">Select product…</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-wood-800">
            Ingredient *
            <select
              required
              value={ingredientId}
              onChange={(event) => setIngredientId(event.target.value)}
              className="rounded border border-cream-300 bg-white px-3 py-2 text-wood-900 focus:outline-none focus:ring-2 focus:ring-burgundy-400"
            >
              <option value="">Select ingredient…</option>
              {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <NumberField label="Measure (grams) *" value={measure} onChange={setMeasure} />
          <label className="flex flex-col gap-1 text-sm font-medium text-wood-800">
            Recipe Unit *
            <input
              required
              value={recipeMeasure}
              onChange={(event) => setRecipeMeasure(event.target.value)}
              className="rounded border border-cream-300 bg-white px-3 py-2 text-wood-900 focus:outline-none focus:ring-2 focus:ring-burgundy-400"
              placeholder="e.g. cups"
            />
          </label>
          <NumberField
            label="Recipe Quantity *"
            value={recipeMeasureQty}
            onChange={setRecipeMeasureQty}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-burgundy-800 px-5 py-2 text-sm font-medium text-cream-100 transition-colors hover:bg-burgundy-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Saving…' : initial?.id ? 'Update Recipe Item' : 'Create Recipe Item'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded bg-cream-200 px-5 py-2 text-sm font-medium text-wood-800 transition-colors hover:bg-cream-300"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function ProductTable({
  products,
  deletingId,
  onEdit,
  onDelete,
}: {
  products: Product[];
  deletingId?: string;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-cream-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-burgundy-800 text-cream-100">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 text-right font-medium">Batch</th>
            <th className="px-4 py-3 text-right font-medium">Price</th>
            <th className="px-4 py-3 text-right font-medium">Threshold</th>
            <th className="px-4 py-3 text-right font-medium">Discount %</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cream-200">
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center italic text-wood-500">
                No products yet.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-cream-50">
                <td className="px-4 py-3 font-medium text-wood-900">{product.name}</td>
                <td className="px-4 py-3 text-right text-wood-700">{product.batch}</td>
                <td className="px-4 py-3 text-right text-wood-700">${product.productPrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-right text-wood-700">{product.priceBreakQuantity ?? '—'}</td>
                <td className="px-4 py-3 text-right text-wood-700">
                  {product.priceBreakDiscount != null ? `${product.priceBreakDiscount}%` : '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="rounded border border-cream-300 bg-cream-100 px-3 py-1 text-xs font-medium text-wood-800 hover:bg-cream-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="rounded border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === product.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function IngredientTable({
  ingredients,
  deletingId,
  onEdit,
  onDelete,
}: {
  ingredients: Ingredient[];
  deletingId?: string;
  onEdit: (ingredient: Ingredient) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-cream-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-burgundy-800 text-cream-100">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 text-right font-medium">Cost</th>
            <th className="px-4 py-3 text-right font-medium">Min (g)</th>
            <th className="px-4 py-3 font-medium">Purchase Unit</th>
            <th className="px-4 py-3 text-right font-medium">Purchase Qty</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cream-200">
          {ingredients.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center italic text-wood-500">
                No ingredients yet.
              </td>
            </tr>
          ) : (
            ingredients.map((ingredient) => (
              <tr key={ingredient.id} className="hover:bg-cream-50">
                <td className="px-4 py-3 font-medium text-wood-900">{ingredient.name}</td>
                <td className="px-4 py-3 text-right text-wood-700">${ingredient.cost.toFixed(4)}</td>
                <td className="px-4 py-3 text-right text-wood-700">{ingredient.ingredientMinimum}</td>
                <td className="px-4 py-3 text-wood-700">{ingredient.ingredientPurchaseMeasure}</td>
                <td className="px-4 py-3 text-right text-wood-700">{ingredient.ingredientPurchaseQuantity}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(ingredient)}
                      className="rounded border border-cream-300 bg-cream-100 px-3 py-1 text-xs font-medium text-wood-800 hover:bg-cream-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(ingredient.id)}
                      disabled={deletingId === ingredient.id}
                      className="rounded border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === ingredient.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function RecipeItemTable({
  recipeItems,
  deletingId,
  onEdit,
  onDelete,
}: {
  recipeItems: RecipeItem[];
  deletingId?: string;
  onEdit: (recipeItem: RecipeItem) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-cream-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-burgundy-800 text-cream-100">
          <tr>
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Ingredient</th>
            <th className="px-4 py-3 text-right font-medium">Measure (g)</th>
            <th className="px-4 py-3 font-medium">Recipe Unit</th>
            <th className="px-4 py-3 text-right font-medium">Recipe Qty</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cream-200">
          {recipeItems.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center italic text-wood-500">
                No recipe items yet.
              </td>
            </tr>
          ) : (
            recipeItems.map((recipeItem) => (
              <tr key={recipeItem.id} className="hover:bg-cream-50">
                <td className="px-4 py-3 font-medium text-wood-900">
                  {recipeItem.product?.name ?? recipeItem.productId}
                </td>
                <td className="px-4 py-3 text-wood-700">
                  {recipeItem.ingredient?.name ?? recipeItem.ingredientId}
                </td>
                <td className="px-4 py-3 text-right text-wood-700">{recipeItem.measure}</td>
                <td className="px-4 py-3 text-wood-700">{recipeItem.recipeMeasure}</td>
                <td className="px-4 py-3 text-right text-wood-700">{recipeItem.recipeMeasureQty}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(recipeItem)}
                      className="rounded border border-cream-300 bg-cream-100 px-3 py-1 text-xs font-medium text-wood-800 hover:bg-cream-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(recipeItem.id)}
                      disabled={deletingId === recipeItem.id}
                      className="rounded border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === recipeItem.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('products');

  const [products, setProducts] = useState<Product[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipeItems, setRecipeItems] = useState<RecipeItem[]>([]);

  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | undefined>();
  const [editingRecipeItem, setEditingRecipeItem] = useState<RecipeItem | undefined>();

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [loadingRecipeItems, setLoadingRecipeItems] = useState(false);

  const [savingProduct, setSavingProduct] = useState(false);
  const [savingIngredient, setSavingIngredient] = useState(false);
  const [savingRecipeItem, setSavingRecipeItem] = useState(false);

  const [deletingId, setDeletingId] = useState<string | undefined>();
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, kind: Toast['kind'] = 'success') => {
    const id = ++toastId;
    setToasts((current) => [...current, { id, message, kind }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const loadProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const payload = await apiFetch('/api/products');
      setProducts(payload.data ?? []);
    } catch (error) {
      addToast(`Failed to load products: ${(error as Error).message}`, 'error');
    } finally {
      setLoadingProducts(false);
    }
  }, [addToast]);

  const loadIngredients = useCallback(async () => {
    setLoadingIngredients(true);
    try {
      const payload = await apiFetch('/api/ingredients');
      setIngredients(payload.data ?? []);
    } catch (error) {
      addToast(`Failed to load ingredients: ${(error as Error).message}`, 'error');
    } finally {
      setLoadingIngredients(false);
    }
  }, [addToast]);

  const loadRecipeItems = useCallback(async () => {
    setLoadingRecipeItems(true);
    try {
      const payload = await apiFetch('/api/recipe-items');
      setRecipeItems(payload.data ?? []);
    } catch (error) {
      addToast(`Failed to load recipe items: ${(error as Error).message}`, 'error');
    } finally {
      setLoadingRecipeItems(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadProducts();
    loadIngredients();
    loadRecipeItems();
  }, [loadProducts, loadIngredients, loadRecipeItems]);

  async function submitProduct(data: Record<string, unknown>) {
    setSavingProduct(true);
    try {
      await apiFetch(editingProduct ? `/api/products/${editingProduct.id}` : '/api/products', {
        method: editingProduct ? 'PATCH' : 'POST',
        body: JSON.stringify(data),
      });
      addToast(editingProduct ? 'Product updated.' : 'Product created.');
      setEditingProduct(undefined);
      await loadProducts();
    } catch (error) {
      addToast((error as Error).message, 'error');
    } finally {
      setSavingProduct(false);
    }
  }

  async function submitIngredient(data: Record<string, unknown>) {
    setSavingIngredient(true);
    try {
      await apiFetch(
        editingIngredient ? `/api/ingredients/${editingIngredient.id}` : '/api/ingredients',
        {
          method: editingIngredient ? 'PATCH' : 'POST',
          body: JSON.stringify(data),
        },
      );
      addToast(editingIngredient ? 'Ingredient updated.' : 'Ingredient created.');
      setEditingIngredient(undefined);
      await loadIngredients();
    } catch (error) {
      addToast((error as Error).message, 'error');
    } finally {
      setSavingIngredient(false);
    }
  }

  async function submitRecipeItem(data: Record<string, unknown>) {
    setSavingRecipeItem(true);
    try {
      await apiFetch(
        editingRecipeItem ? `/api/recipe-items/${editingRecipeItem.id}` : '/api/recipe-items',
        {
          method: editingRecipeItem ? 'PATCH' : 'POST',
          body: JSON.stringify(data),
        },
      );
      addToast(editingRecipeItem ? 'Recipe item updated.' : 'Recipe item created.');
      setEditingRecipeItem(undefined);
      await loadRecipeItems();
    } catch (error) {
      addToast((error as Error).message, 'error');
    } finally {
      setSavingRecipeItem(false);
    }
  }

  async function removeItem(resource: 'products' | 'ingredients' | 'recipe-items', id: string) {
    if (!window.confirm('Delete this item?')) {
      return;
    }

    setDeletingId(id);
    try {
      await apiFetch(`/api/${resource}/${id}`, { method: 'DELETE' });
      addToast('Item deleted.');

      if (resource === 'products') {
        await loadProducts();
      } else if (resource === 'ingredients') {
        await loadIngredients();
      } else {
        await loadRecipeItems();
      }
    } catch (error) {
      addToast((error as Error).message, 'error');
    } finally {
      setDeletingId(undefined);
    }
  }

  const tabs: Array<{ key: Tab; label: string; count: number }> = [
    { key: 'products', label: 'Products', count: products.length },
    { key: 'ingredients', label: 'Ingredients', count: ingredients.length },
    { key: 'recipe-items', label: 'Recipe Items', count: recipeItems.length },
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="fixed right-4 top-4 z-50 flex max-w-xs flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={classNames(
              'rounded-lg px-4 py-3 text-sm font-medium shadow-lg',
              toast.kind === 'success' ? 'bg-burgundy-800 text-cream-100' : 'bg-red-700 text-white',
            )}
          >
            {toast.message}
          </div>
        ))}
      </div>

      <header className="border-b border-burgundy-700 bg-burgundy-800 text-cream-100">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold">Bakery Admin</h1>
              <p className="mt-1 text-sm text-cream-300">
                Manage products, ingredients, and recipe formulas from one place.
              </p>
            </div>
            <a
              href="/"
              className="text-sm font-medium text-cream-300 underline transition-colors hover:text-white"
            >
              ← Back to site
            </a>
          </div>

          <nav className="flex flex-wrap gap-2">
            {tabs.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={classNames(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  tab === item.key
                    ? 'bg-cream-100 text-burgundy-900'
                    : 'bg-burgundy-700 text-cream-200 hover:bg-burgundy-600 hover:text-white',
                )}
              >
                {item.label}
                <span className="ml-2 rounded-full bg-burgundy-900/20 px-2 py-0.5 text-xs">
                  {item.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {tab === 'products' && (
          <section className="grid gap-8">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-serif font-semibold text-burgundy-900">
                  {editingProduct ? 'Edit Product' : 'Create Product'}
                </h2>
                <button
                  onClick={loadProducts}
                  disabled={loadingProducts}
                  className="text-sm text-wood-500 transition-colors hover:text-wood-800"
                >
                  {loadingProducts ? 'Loading…' : 'Refresh'}
                </button>
              </div>
              <ProductForm
                key={editingProduct?.id ?? 'new-product'}
                initial={editingProduct}
                loading={savingProduct}
                onSubmit={submitProduct}
                onCancel={editingProduct ? () => setEditingProduct(undefined) : undefined}
              />
            </div>

            <div>
              <h2 className="mb-3 text-xl font-serif font-semibold text-burgundy-900">Products</h2>
              <ProductTable
                products={products}
                deletingId={deletingId}
                onEdit={setEditingProduct}
                onDelete={(id) => removeItem('products', id)}
              />
            </div>
          </section>
        )}

        {tab === 'ingredients' && (
          <section className="grid gap-8">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-serif font-semibold text-burgundy-900">
                  {editingIngredient ? 'Edit Ingredient' : 'Create Ingredient'}
                </h2>
                <button
                  onClick={loadIngredients}
                  disabled={loadingIngredients}
                  className="text-sm text-wood-500 transition-colors hover:text-wood-800"
                >
                  {loadingIngredients ? 'Loading…' : 'Refresh'}
                </button>
              </div>
              <IngredientForm
                key={editingIngredient?.id ?? 'new-ingredient'}
                initial={editingIngredient}
                loading={savingIngredient}
                onSubmit={submitIngredient}
                onCancel={editingIngredient ? () => setEditingIngredient(undefined) : undefined}
              />
            </div>

            <div>
              <h2 className="mb-3 text-xl font-serif font-semibold text-burgundy-900">Ingredients</h2>
              <IngredientTable
                ingredients={ingredients}
                deletingId={deletingId}
                onEdit={setEditingIngredient}
                onDelete={(id) => removeItem('ingredients', id)}
              />
            </div>
          </section>
        )}

        {tab === 'recipe-items' && (
          <section className="grid gap-8">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-serif font-semibold text-burgundy-900">
                  {editingRecipeItem ? 'Edit Recipe Item' : 'Create Recipe Item'}
                </h2>
                <button
                  onClick={loadRecipeItems}
                  disabled={loadingRecipeItems}
                  className="text-sm text-wood-500 transition-colors hover:text-wood-800"
                >
                  {loadingRecipeItems ? 'Loading…' : 'Refresh'}
                </button>
              </div>
              <RecipeItemForm
                key={editingRecipeItem?.id ?? 'new-recipe-item'}
                initial={editingRecipeItem}
                products={products}
                ingredients={ingredients}
                loading={savingRecipeItem}
                onSubmit={submitRecipeItem}
                onCancel={editingRecipeItem ? () => setEditingRecipeItem(undefined) : undefined}
              />
            </div>

            <div>
              <h2 className="mb-3 text-xl font-serif font-semibold text-burgundy-900">Recipe Items</h2>
              <RecipeItemTable
                recipeItems={recipeItems}
                deletingId={deletingId}
                onEdit={setEditingRecipeItem}
                onDelete={(id) => removeItem('recipe-items', id)}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
