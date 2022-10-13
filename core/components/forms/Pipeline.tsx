import { FC, ReactNode, useEffect, useRef, useState } from 'react';

import styles from './Pipeline.module.scss';

type TStand = 'ceiling' | 'plenum' | 'floor' | 'unknown';

interface IShape {
    width: number;
    height: number;
    left: number;
    top: number;
    bottom: number;
}

interface IProps {
    raw?: boolean;
    headerOffset?: number;
    children: ReactNode;
}

const Pipeline: FC<IProps> = ({ raw = false, headerOffset = 60, children }) => {
    const [shape, setShape] = useState<IShape>({
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        bottom: 0,
    });

    const [stand, setStand] = useState<TStand>('unknown');

    const pipelineRef = useRef<any>(null);
    const innerBoxRef = useRef<any>(null);

    const updatePipeline = () => {
        const pipelineRect = pipelineRef.current.getBoundingClientRect();
        const innerBoxRect = innerBoxRef.current.getBoundingClientRect();

        let newStand: TStand = 'ceiling';

        if (
            pipelineRect.height === 0 ||
            innerBoxRect.height === 0 ||
            pipelineRect.height < innerBoxRect.height
        ) {
            newStand = 'ceiling';
        } else {
            if (pipelineRect.top <= headerOffset) newStand = 'plenum';
            if (pipelineRect.bottom <= window.innerHeight) newStand = 'floor';
        }

        setShape({
            width: pipelineRef.current.clientWidth,
            height: window.innerHeight - pipelineRef.current.offsetTop,
            left: pipelineRef.current.offsetLeft,
            top: headerOffset,
            bottom: window.innerHeight - pipelineRect.bottom,
        });

        setStand(newStand);
    };

    useEffect(() => {
        window.addEventListener('load', updatePipeline);
        window.addEventListener('scroll', updatePipeline);
        window.addEventListener('resize', updatePipeline);

        updatePipeline();

        return () => {
            window.removeEventListener('load', updatePipeline);
            window.removeEventListener('scroll', updatePipeline);
            window.removeEventListener('resize', updatePipeline);
        };
    }, []);

    return (
        <>
            <div className={styles.pipeline} ref={pipelineRef}>
                <div
                    className={styles.innerBox}
                    ref={innerBoxRef}
                    style={{
                        position: stand === 'plenum' || stand === 'floor' ? 'fixed' : 'static',
                        top: stand === 'plenum' ? shape.top : 'unset',
                        bottom: stand === 'floor' ? shape.bottom : 'unset',
                        left: shape.left,
                        width: shape.width,
                        height: shape.height,
                        display: shape.width > 0 ? 'block' : 'none',
                    }}
                >
                    {raw === true ? null : children}
                </div>
            </div>
            {raw === true ? children : null}
        </>
    );
};

export default Pipeline;
