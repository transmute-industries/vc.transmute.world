import k0 from './k0.json';
import k1 from './k1.json';
import k2 from './k2.json';
import k3 from './k3.json';

export { k0, k1, k2, k3 };

export const keys = [k0, k1, k2, k3];

export const getKeyPairById = (id: string) => {
  return keys.find((k: any) => {
    return k.id === id;
  });
};
