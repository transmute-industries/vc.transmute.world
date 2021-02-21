import k0 from './k0.json';
import k1 from './k1.json';
import k2 from './k2.json';
import k3 from './k3.json';
import k4 from './k4.json';
import k5 from './k5.json';

export { k0, k1, k2, k3, k4, k5 };

export const keys = [k0, k1, k2, k3, k4, k5];

export const getKeyPairById = (id: string) => {
  return keys.find((k: any) => {
    return k.id === id;
  });
};
