# Orquídeate MVP

Web local para validar el MVP de Orquídeate: catálogo mock, detalle de producto, personalizador y preórdenes conectadas a Supabase.

## Stack

- React
- Vite
- React Router
- Supabase para guardar preórdenes
- CSS global

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Variables de entorno

Crea un archivo `.env.local` con:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

No subas `.env.local` al repositorio.

## Build

```bash
npm run build
```

## Deploy en Vercel

En Vercel, configura las mismas variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
