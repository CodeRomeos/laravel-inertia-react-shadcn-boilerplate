import React, {forwardRef, HTMLAttributes} from 'react';
import classNames from 'classnames';

import {Action, Handle, Remove} from '../';
import styles from './TreeItem.module.css';
import { Label } from '@/shadcn/ui/label';
import { Input } from '@/shadcn/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/ui/select';
import { Button } from '@/shadcn/ui/button';
import { useState } from 'react';
import { PencilIcon } from 'lucide-react';

const EditItemForm = ({ item, onItemChange, onClose, onRemove }) => {
    const [label, labelSet] = useState(item.label);
    const [url, urlSet] = useState(item.url);
    const [target, targetSet] = useState(item.target);

    const submit = (e) => {
        e.preventDefault();
        onItemChange({
            ...item,
            label: label,
            url: url,
            target: target,
        });
    };

    return (
        <form
            className="bg-slate-50 p-6 border grid grid-cols-3 gap-2 items-center"
            onSubmit={submit}
        >
            <Label htmlFor="label">Label</Label>
            <div className="col-span-2">
                <Input
                    id="label"
                    type="text"
                    name="label"
                    value={label}
                    onChange={(e) => labelSet(e.target.value)}
                />
            </div>
            {item.link_type == "custom_link" && (
                <>
                    <Label htmlFor="url">URL</Label>
                    <div className="col-span-2">
                        <Input
                            id="url"
                            type="text"
                            name="url"
                            value={url}
                            onChange={(e) => urlSet(e.target.value)}
                        />
                    </div>
                </>
            )}
            <Label htmlFor="target">Target</Label>
            <div className="col-span-2">
                <Select value={target} onValueChange={targetSet}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="_self">Default</SelectItem>
                        <SelectItem value="_blank">New Tab</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="col-span-3 justify-between flex gap-2">
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        type="button"
                        variant="destructive"
                        onClick={onRemove}
                    >
                        Remove
                    </Button>
                    <Button
                        size="sm"
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </div>
                <Button size="sm" type="submit" variant="outline">
                    Update
                </Button>
            </div>
        </form>
    );
};


export const TreeItem = forwardRef(
  (
    {
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      style,
      value,
      wrapperRef,
      item,
      ...props
    },
    ref
  ) => {
    const [editing, editingSet] = useState(false);
    return (
        <li
            className={classNames(
                styles.Wrapper,
                clone && styles.clone,
                ghost && styles.ghost,
                indicator && styles.indicator,
                disableSelection && styles.disableSelection,
                disableInteraction && styles.disableInteraction
            )}
            ref={wrapperRef}
            style={{
                "--spacing": `${indentationWidth * depth}px`,
            }}
            {...props}
        >
            <div className={styles.TreeItem} ref={ref} style={style}>
                <Handle {...handleProps} />
                {onCollapse && (
                    <Action
                        onClick={onCollapse}
                        className={classNames(
                            styles.Collapse,
                            collapsed && styles.collapsed
                        )}
                    >
                        {collapseIcon}
                    </Action>
                )}
                <span className={styles.Text}>{value}</span>

                <span className="text-xs text-muted-foreground mx-1 capitalize">
                    {item?.link_type.split('_').join(' ')}
                </span>
                <Button
                    onClick={() => editingSet(!editing)}
                    size="sm"
                    variant="ghost"
                >
                    <PencilIcon className="w-3 h-3" />
                </Button>
                {!clone && onRemove && <Remove onClick={onRemove} />}
                {clone && childCount && childCount > 1 ? (
                    <span className={styles.Count}>{childCount}</span>
                ) : null}
            </div>

            <div
                className={`transition-all ${
                    editing ? "h-auto visible" : "h-0 hidden"
                }`}
            >
                {item && (
                    <EditItemForm
                        item={item}
                        onItemChange={props.onItemChange}
                        onClose={() => editingSet(false)}
                        onRemove={onRemove}
                    />
                )}
            </div>
        </li>
    );
  }
);

const collapseIcon = (
  <svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 41">
    <path d="M30.76 39.2402C31.885 40.3638 33.41 40.995 35 40.995C36.59 40.995 38.115 40.3638 39.24 39.2402L68.24 10.2402C69.2998 9.10284 69.8768 7.59846 69.8494 6.04406C69.822 4.48965 69.1923 3.00657 68.093 1.90726C66.9937 0.807959 65.5106 0.178263 63.9562 0.150837C62.4018 0.123411 60.8974 0.700397 59.76 1.76024L35 26.5102L10.24 1.76024C9.10259 0.700397 7.59822 0.123411 6.04381 0.150837C4.4894 0.178263 3.00632 0.807959 1.90702 1.90726C0.807714 3.00657 0.178019 4.48965 0.150593 6.04406C0.123167 7.59846 0.700153 9.10284 1.75999 10.2402L30.76 39.2402Z" />
  </svg>
);