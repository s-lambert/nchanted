import type { MetaFunction } from '@remix-run/node';
import * as styles from './test.css';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Nchanted' }, { name: 'prototyping project', content: 'Nchanted' }];
};

export default function Index() {
  return (
    <div className={styles.root}>
      <p>
        <Link className={styles.link} to="dashboard">
          Dashboard
        </Link>
      </p>
      <p>
        <Link className={styles.link} to="grimoires">
          Grimoires
        </Link>
      </p>
    </div>
  );
}
