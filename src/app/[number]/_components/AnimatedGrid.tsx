// AnimatedGridRB.tsx
'use client';

import { Row, Col, type RowProps, type ColProps } from 'react-bootstrap';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import * as React from 'react';

const MotionRow = motion(Row);
const MotionCol = motion(Col);

type AnimatedGridRBProps<T> = {
    items: T[];
    getKey: (item: T) => string | number;
    renderCard: (item: T) => React.ReactNode;
    rowProps?: RowProps;
    colProps?: ColProps & { className?: string };
    gapClass?: string;
    enterY?: number;
    duration?: number;
    initialMountAnimation?: boolean;
};

export function AnimatedGrid<T>({
                                      items,
                                      getKey,
                                      renderCard,
                                      rowProps,
                                      colProps,
                                      gapClass = 'g-3',
                                      enterY = 12,
                                      duration = 0.22,
                                      initialMountAnimation = true,
                                  }: AnimatedGridRBProps<T>) {
    const reduce = useReducedMotion();

    const variants = {
        hidden: { opacity: 0, y: reduce ? 0 : enterY },
        show:   { opacity: 1, y: 0 },
        exit:   { opacity: 0, y: reduce ? 0 : -enterY },
    };

    return (
        <MotionRow
            {...rowProps}
            className={[gapClass, rowProps?.className].filter(Boolean).join(' ')}
            layout
            transition={{ layout: { duration: 0.28 } }}
        >
            <AnimatePresence mode="popLayout" initial={initialMountAnimation}>
                {items.map((item) => (
                    <MotionCol
                        key={getKey(item)}
                        {...colProps}
                        layout
                        variants={variants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        transition={{ type: 'tween', duration }}
                    >
                        {renderCard(item)}
                    </MotionCol>
                ))}
            </AnimatePresence>
        </MotionRow>
    );
}
