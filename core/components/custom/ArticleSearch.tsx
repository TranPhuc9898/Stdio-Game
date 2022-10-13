import classnames from 'classnames';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
    forwardRef,
    ForwardRefRenderFunction,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IoIosCloseCircleOutline, IoMdSearch } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

import { STR } from '@stdio/configs/constants';
import { TSearch } from '@stdio/configs/custom-types';
import { Storage } from '@stdio/core/libs/storage';
import { L } from '@stdio/public/locales/langs';

import styles from './ArticleSearch.module.scss';

interface IProps {
    initSearchTerm?: string;
    initType?: TSearch;
    placeholder?: string;
    onSearch: (q: string, type: TSearch) => void;
}

const ArticleSearch: ForwardRefRenderFunction<unknown, IProps> = (
    { initSearchTerm = '', placeholder, onSearch = (q, type) => {} },
    ref,
) => {
    const { t } = useTranslation('common');
    const router = useRouter();

    useImperativeHandle(ref, () => ({
        search: () => {
            performSearch();
        },
    }));

    const getType = () => {
        const types: TSearch[] = ['articles', 'boards', 'users'];
        const type = (router?.query?.type ?? 'articles') as TSearch;
        return !types.includes(type) ? 'articles' : type;
    };

    const [searchTerm, setSearchTerm] = useState(initSearchTerm);

    const [searchTermCache, setSearchTermCache] = useState<string[]>([]);

    const [visibleCompleteBox, setVisibleCompleteBox] = useState(false);

    const mainSearchRef = useRef<any>(null);

    useEffect(() => {
        let newSearchTermCache: any = Storage.Local.get(STR.SEARCH_TERM_CACHE);
        if (newSearchTermCache === null) newSearchTermCache = [];

        setSearchTermCache(newSearchTermCache);

        document.addEventListener('size', hideAutoCompleteBox);
        document.addEventListener('click', hideAutoCompleteBox);

        return () => {
            document.removeEventListener('size', hideAutoCompleteBox);
            document.removeEventListener('click', hideAutoCompleteBox);
        };
    }, []);

    const SearchTermCache = {
        add: () => {
            let tempSearchTerm = searchTerm.trim();
            if (tempSearchTerm === '') return;

            let searchTermCache = Storage.Local.get<string[] | null>(STR.SEARCH_TERM_CACHE);

            if (searchTermCache === null) searchTermCache = [];

            searchTermCache = searchTermCache.filter(
                (s) => s.trim().toLocaleLowerCase() !== tempSearchTerm.toLocaleLowerCase(),
            );
            searchTermCache.unshift(tempSearchTerm);

            Storage.Local.set<string[]>(STR.SEARCH_TERM_CACHE, searchTermCache);
            setSearchTermCache(searchTermCache);
        },
        clearAll: () => {
            Storage.Local.remove(STR.SEARCH_TERM_CACHE);
            setSearchTermCache([]);
        },
    };

    const hideAutoCompleteBox = (e: any) => {
        if (mainSearchRef.current && !mainSearchRef.current.contains(e.target))
            setVisibleCompleteBox(false);
    };

    const performSearch = () => {
        if (searchTerm.trim() === '') return;

        SearchTermCache.add();
        setVisibleCompleteBox(false);

        router.push(`/search?q=${encodeURIComponent(searchTerm)}&type=${getType()}`);

        onSearch(searchTerm, getType());
    };

    return (
        <div className={styles.articleSearch}>
            <div className={styles.articleSearchCenter} ref={mainSearchRef}>
                <div className={styles.searchBox}>
                    <div className={styles.input}>
                        <input
                            placeholder={!!placeholder ? placeholder : t(L.Search) + '...'}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            value={searchTerm}
                            onFocus={() => setVisibleCompleteBox(true)}
                            type="text"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    performSearch();
                                }
                            }}
                        />
                        <div
                            className={classnames(styles.button, {
                                [styles.hide]: searchTerm === '',
                            })}
                            onClick={() => {
                                setSearchTerm('');
                            }}
                        >
                            <IoIosCloseCircleOutline />
                        </div>
                        <div className={styles.button} onClick={performSearch}>
                            <IoMdSearch size={32} />
                        </div>
                    </div>
                    <div
                        className={classnames(styles.autoComplete, {
                            [styles.visible]: visibleCompleteBox,
                        })}
                    >
                        <Scrollbars autoHide autoHeight autoHeightMax={400} universal>
                            <div className={styles.autoCompleteBox}>
                                {!isEmpty(searchTermCache) && (
                                    <>
                                        <div className={styles.title}>
                                            <span>
                                                <>{t(L.RecentSearches)}</>
                                            </span>
                                            <a
                                                role="button"
                                                onClick={() => {
                                                    SearchTermCache.clearAll();
                                                }}
                                            >
                                                <IoClose />
                                            </a>
                                        </div>

                                        <ul>
                                            {searchTermCache.map((st, i) => (
                                                <li key={i}>
                                                    <a
                                                        href={`/search?q=${encodeURIComponent(
                                                            st,
                                                        )}&type=${getType()}`}
                                                    >
                                                        {st}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {searchTerm.trim() !== '' ? (
                                    <p>
                                        <>
                                            {t(L.SeeSearchResultsFor)} <b>{searchTerm}</b>
                                        </>
                                    </p>
                                ) : (
                                    <p>
                                        <>{t(L.SearchHint)}</>
                                    </p>
                                )}
                            </div>
                        </Scrollbars>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default forwardRef(ArticleSearch);
