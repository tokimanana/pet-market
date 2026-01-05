import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Pages statiques - peuvent être pré-rendues
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'cart',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'checkout/success',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'checkout/cancel',
    renderMode: RenderMode.Prerender
  },
  
  // Pages dynamiques - rendu côté serveur uniquement (pas de prerender)
  {
    path: 'products',
    renderMode: RenderMode.Server  // ✅ Évite le timeout du prerender
  },
  
  // Catch-all
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];