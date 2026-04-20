export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

export function parseNumber(value: unknown, fieldName: string): number {
  const parsed = typeof value === 'number' ? value : Number(value);

  if (!Number.isFinite(parsed)) {
    throw new ApiError(400, `${fieldName} must be a valid number.`);
  }

  return parsed;
}

export function parseOptionalNumber(value: unknown, fieldName: string): number | null {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  return parseNumber(value, fieldName);
}

export function parseString(value: unknown, fieldName: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new ApiError(400, `${fieldName} is required.`);
  }

  return value.trim();
}

export function parseOptionalString(value: unknown, _fieldName: string): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value !== 'string') {
    throw new ApiError(400, 'Value must be a valid string.');
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
}

export async function readJsonBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ApiError(400, 'Request body must be valid JSON.');
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return Response.json({ error: error.message }, { status: error.status });
  }

  console.error(error);
  return Response.json({ error: 'Internal server error.' }, { status: 500 });
}
