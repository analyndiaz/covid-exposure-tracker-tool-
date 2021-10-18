export class ValidationState {
  errors: PropertyError[];

  constructor() {
    this.errors = [];
  }

  isValid() {
    return this.errors.length === 0;
  }

  addErrors(error: PropertyError) {
    this.errors = [...this.errors, error];
  }
}

export class PropertyError {
  property: string;
  errorMessage: string;

  constructor(error: any) {
    this.property = error.property;
    this.errorMessage = error.errorMessage;
  }
}
