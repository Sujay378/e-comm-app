export interface recipe {
name: string

}

export interface Login {
  email: string,
  password: string
}

export interface Register {
  name: string
  email: string,
  password: string,
}

export interface Modal {
  header?: string;
  icon?: boolean;
  body?: string;
  primaryButton?: string;
  secondaryButton?: string;
  primaryCallback?: () => void;
  secondaryCallback?: () => void;
}
