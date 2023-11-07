import { api } from '@/data/api';
import { Product } from '@/data/types/products';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

async function getFeaturedProducts() {
  // Force-cahce -> Cacheia a requisição (default)
  // No-store -> Não cacheia
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60, // 1h cacheado pelo next, sem precisar fazer uma nova requisição para o backend, deixando de forma estática
    },
  });

  const products: Product[] = await response.json();

  return products;
}

export const metadata: Metadata = {
  title: 'Home',
};

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts();

  return (
    <div className="grid-rows-6 grid max-h-[860px] grid-cols-9 gap-6">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 flex overflow-hidden rounded-lg bg-zinc-900"
      >
        <Image
          src={highlightedProduct.image}
          width={920}
          height={920}
          quality={100}
          alt=""
          className="translate-y-20 transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute bottom-28 right-28 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="truncate text-sm">{highlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore  */}
            {highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="group relative col-span-3 row-span-3 flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900"
        >
          <Image
            src={product.image}
            width={920}
            height={920}
            quality={100}
            alt=""
            className="translate-y-14 transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute bottom-10 right-10 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="truncate text-sm">{product.title}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore  */}
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
