import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { IBoard } from '@stdio/configs/custom-types';
import { useMui } from '@stdio/core/mui/global/MUI';

import styles from './Home.module.scss';

interface IProps {
    board: IBoard;
}

const Home: FC<IProps> = (props) => {
    const { m } = useMui();

    const { t } = useTranslation('common');

    const dispatch = useDispatch();
    const [board, setBoard] = useState({
        suggestedArticles: [],
        featuredArticle: '',
    });

    useEffect(() => {
        const { featuredArticle, suggestedArticles } = props.board;

        // setBoard({
        //     suggestedArticles: suggestedArticles.length === 0 ? ['', '', ''] : suggestedArticles.map((item) => item._id),
        //     featuredArticle: featuredArticle?._id ?? '',
        // });
    }, [props.board]);

    return (
        <div className={styles.home}>
            {/* <Input
                placeholder="Featured post internalId"
                value={board.featuredArticle}
                onChange={(e) => setBoard({ ...board, featuredArticle: e.target.value })}
                style={{ fontSize: '1rem' }}
            />
            <Input
                placeholder="Post 1 internalId"
                value={board?.suggestedArticles[0] ?? ''}
                onChange={(e) => {
                    let suggestedArticles = board.suggestedArticles;
                    suggestedArticles[0] = e.target.value;
                    setBoard({ ...board, suggestedArticles });
                }}
                style={{ fontSize: '1rem' }}
            />
            <Input
                placeholder="Post 2 internalId"
                value={board?.suggestedArticles[1] ?? ''}
                onChange={(e) => {
                    let suggestedArticles = board.suggestedArticles;
                    suggestedArticles[1] = e.target.value;
                    setBoard({ ...board, suggestedArticles });
                }}
                style={{ fontSize: '1rem' }}
            />
            <Input
                placeholder="Post 3 internalId"
                value={board?.suggestedArticles[2] ?? ''}
                onChange={(e) => {
                    let suggestedArticles = board.suggestedArticles;
                    suggestedArticles[2] = e.target.value;
                    setBoard({ ...board, suggestedArticles });
                }}
                style={{ fontSize: '1rem' }}
            />
            <Button
                type="primary"
                onClick={() => {
                    dispatch(boardActions.updateBoard(props.board._id, board));
                }}
            >
                {t(LANG.Save)}
            </Button> */}
        </div>
    );
};

export default Home;
