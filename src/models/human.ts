import type {
  Base,
  Rollback,
  RollbackPrivate,
  Save,
  SavePrivate,
  Validate,
  ValidatePrivate,
  Options,
  PatternAssert
} from '@vueent/mix-models';
import { BaseModel, mixRollback, mixSave, mixValidate, mix } from '@vueent/mix-models';
import { v9s, simplify } from 'v9s';
import { hex, email, integer } from 'v9sx';

import { phone, name } from '@/utilities/validators';

export interface Credentials {
  first: string;
  second: string;
  last: string;
}

export interface Document {
  fakeId: number;
  id: string;
  filename: string;
}

export interface Value {
  fakeId: number;
  val: string;
}

export interface Item {
  fakeId: number;
  values: Value[];
}

export interface Data {
  id: string;
  phones: string[];
  phone: string;
  email: string;
  age: string;
  credentials: Credentials;
  documents: Document[];
  items: Item[];
}

export type EncodedCredentials = Credentials;

export type EncodedDocument = Omit<Document, 'fakeId'>;

export type EncodedValue = Omit<Value, 'fakeId'>;

export interface EncodedItem {
  values: EncodedValue[];
}

export interface EncodedData {
  id: string;
  phones: string[];
  phone: string;
  email: string;
  age: number;
  credentials: EncodedCredentials;
  documents: EncodedDocument[];
  items: EncodedItem[];
}

export function makeInitialData(): Data {
  return {
    id: '',
    phones: [],
    phone: '',
    email: '',
    age: '',
    credentials: {
      first: '',
      second: '',
      last: ''
    },
    documents: [],
    items: []
  };
}

const rollbackMask = {
  id: false,
  phones: true,
  phone: true,
  email: true,
  age: true,
  credentials: {
    first: true,
    second: true,
    last: true
  },
  documents: true,
  items: true
} as const;

export const extendedRollbackMask = {
  id: false,
  phones: true,
  phone: true,
  email: true,
  age: true,
  credentials: {
    first: true,
    second: true,
    last: true
  },
  documents: {
    $array: true,
    id: true,
    filename: true
  },
  items: {
    $array: true,
    values: {
      $array: true,
      val: true
    }
  }
} as const;

const validations = {
  phones: {
    $each: simplify(v9s<string>().minLength(1, 'Enter phone number').use(phone, 'Invalid phone format')),
    $self: simplify(v9s<string>().minLength(1, 'Invalid phones'))
  },
  phone: simplify(v9s<string>().minLength(1, 'Enter phone number').use(phone, 'Invalid phone format')),
  email: simplify(
    v9s<string>()
      .minLength(1, 'Enter E-mail')
      .maxLength(255, 'Maximum E-mail length exceeded')
      .use(email, 'Invalid E-mail format')
  ),
  age: simplify(
    v9s<string>()
      .minLength(1, 'Enter age')
      .use(integer, 'Age must be an integer value', Number)
      .gte(0, 'Age cannot be negative')
      .lte(150, 'Age cannot exceed 150 years')
  ),
  credentials: {
    $sub: {
      first: simplify(
        v9s<string>()
          .minLength(1, 'Enter first name')
          .maxLength(255, 'Maximum first name length exceeded')
          .use(name, 'Remove invalid characters')
      ),
      second: simplify(
        v9s<string>()
          .maxLength(255, 'Maximum second name length exceeded')
          .use(name, 'Remove invalid characters')
          .or(v9s<string>().strictLength(0, 'Remove invalid characters'))
      ),
      last: simplify(
        v9s<string>()
          .minLength(1, 'Enter last name')
          .maxLength(255, 'Maximum last name length exceeded')
          .use(name, 'Remove invalid characters')
      )
    }
  },
  documents: {
    $each: {
      id: simplify(
        v9s<string>()
          .minLength(1, 'Enter document id')
          .strictLength(32, 'Document id length must be equal to 32 characters')
          .use(hex, 'Document id must be a hex string')
      ),
      filename: simplify(
        v9s<string>().minLength(1, 'Enter document filename').maxLength(1024, 'Maximun document filename length exceeded')
      )
    }
  },
  items: {
    $each: {
      values: {
        $each: {
          val: simplify(
            v9s<string>()
              .minLength(1, 'Enter value')
              .minLength(6, 'Value length must exceed 6 characters')
              .maxLength(255, 'Maximum value length exceeded')
          )
        }
      }
    }
  }
} as const;

export type Validations = PatternAssert<typeof validations, Data>;

class DataModel extends BaseModel<Data> {}

export type ModelType = Base<Data> & Rollback & Save & Validate<Validations>;

export interface Model extends DataModel, RollbackPrivate<Data>, SavePrivate<Data>, ValidatePrivate<Validations> {}

export class Model extends mix<Data, typeof DataModel>(
  DataModel,
  mixRollback(rollbackMask),
  mixSave(),
  mixValidate(validations)
) {
  constructor(initialData?: Data, react = true, ...options: Options[]) {
    super('id', initialData ?? makeInitialData(), react, ...options);

    if (this.pk) this._flags.new = false;
  }

  // validation state will be resetted automatically after the model saving
  afterSave(): void {
    this.v.reset();
  }
}
