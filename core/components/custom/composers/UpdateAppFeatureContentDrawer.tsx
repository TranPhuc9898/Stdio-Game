import { Button, Stack, TextField } from '@mui/material';
import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useMui } from '@stdio/core/mui/global/MUI';
import BasicDrawer from '@stdio/core/mui/wrappers/BasicDrawer';
import { L } from '@stdio/public/locales/langs';

import { AppAPI } from '@stdio/core/apis/AppAPI';

interface IProps {}

const UpdateAppFeatureContentDrawer: ForwardRefRenderFunction<unknown, IProps> = ({}, ref) => {
    const { t } = useTranslation('common');
    const { m } = useMui();

    const basicDrawerRef = useRef<any>(null);

    const [index, setIndex] = useState<any>(0);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const appIdRef = useRef<any>('');
    const featuresRef = useRef<any>([]);
    const onSaveRef = useRef<any>(() => {});

    useImperativeHandle(ref, () => ({
        open: (newAppId: string, newFeatures: any, newIndex: any, onSave: any) => {
            appIdRef.current = newAppId;
            featuresRef.current = newFeatures;
            onSaveRef.current = onSave;

            setIndex(newIndex);
            setTitle(newFeatures[newIndex].title);
            setDescription(newFeatures[newIndex].description);

            if (basicDrawerRef.current) basicDrawerRef.current.open();
        },
        close: () => {
            if (basicDrawerRef.current) basicDrawerRef.current.close();
        },
    }));

    const save = () => {
        m.confirmDialog.open(
            'Update app feature title & description?',
            '',
            () => {
                m.loading(true);

                const feature = featuresRef.current[index];

                AppAPI.updateFeature(appIdRef.current, feature._id, {
                    title,
                    description,
                })
                    .then((resp) => {
                        onSaveRef.current(resp?.data.features);
                        basicDrawerRef.current.close();
                        m.message('success', 'Save feature success!!!');
                    })
                    .catch((err) => {
                        console.log(err);
                        m.message('error', 'Save feature failed!!!');
                    })
                    .finally(() => m.loading(false));
            },
            () => {},
        );
    };

    return (
        <BasicDrawer
            title="Update App Feature Content"
            useCloseButton={true}
            anchor="left"
            ref={basicDrawerRef}
            width="40%"
            content={
                <Stack spacing={2}>
                    <TextField
                        label={t(L.Title)}
                        size="small"
                        fullWidth
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <TextField
                        label={t(L.Description)}
                        multiline
                        rows={2}
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            save();
                        }}
                    >
                        Update
                    </Button>
                </Stack>
            }
        />
    );
};

export default forwardRef(UpdateAppFeatureContentDrawer);
