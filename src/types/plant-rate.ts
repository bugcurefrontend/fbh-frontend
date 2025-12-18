/**
 * PlantRate type definitions
 * Matches the Strapi PlantRate collection schema
 */

export interface PlantRate {
  id: number;
  documentId: string;
  currency_code: string;
  geotagged_rate: number;
  non_geotagged_rate: number;
  deleted: boolean;
}

export interface PlantRateResponse {
  data: PlantRate[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
