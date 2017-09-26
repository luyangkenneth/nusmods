// @flow
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import type { Module } from 'types/modules';

import styles from './ModuleTree.scss';

type Props = {
  module: Module,
};

type TreeObj = {
  name: String,
  children: Array<TreeObj>,
};

type TreeDisplay = {
  name: String,
  branches: Array<TreeObj>,
};

function Branch({ branches }: { branches: Array<TreeObj> }) {
  if (_.isEmpty(branches)) {
    return null;
  }
  return (
    <ul className={styles.tree}>
      {branches.map((child, i) => {
        if (Array.isArray(child)) {
          return child.map((subchild, j) => <Tree key={`${i}${j}`} name={subchild.name} branches={subchild.children} />);
        }
        return <Tree name={child.name} branches={child.children} />;
      })}
    </ul>
  );
}

function Tree({ name, branches }: TreeDisplay) {
  return (
    <li className={styles.branch}>
      <div
        className={classnames(styles.node, {
          [styles.conditional]: name === 'or' || name === 'and',
        })}
      >
        {name}
      </div>
      <Branch branches={branches} />
    </li>
  );
}

function ModuleTree(props: Props) {
  // $FlowFixMe when we can add properties
  const modTree = props.module.ModmavenTree;
  return (
    <ul className={`${styles.tree} ${styles.root}`}>
      <Tree name={modTree.name} branches={_.castArray(modTree.children)} />
    </ul>
  );
}

export default ModuleTree;
