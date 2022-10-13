import { Editor } from '@tinymce/tinymce-react';
import { FC } from 'react';

import { TINYMCE_API_KEY } from '@stdio/configs/config';
import { ArticleAPI } from '@stdio/core/apis/ArticleAPI';
import { getMediaURL } from '@stdio/core/libs/custom-utils';
import { useMui } from '@stdio/core/mui/global/MUI';

interface IProps {
    editorRef?: any;
    disabled?: boolean;
    placeholder?: string;
    articleId: string;
    content: string;
}

const CommentEditor: FC<IProps> = ({ editorRef, articleId, disabled, placeholder, content }) => {
    const { m } = useMui();

    const initialConfig = {
        entity_encoding: 'raw' as any,
        relative_urls: false,
        branding: false,
        height: 150,
        plugins: [
            'advlist',
            'autolink',
            'autoresize',
            'lists',
            'link',
            'image',
            'charmap',
            'print',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'table',
            'paste',
            'code',
            'wordcount',
        ],
        menubar: false,
        statusbar: false,
        toolbar: 'bold italic formatCodeButton | link bullist numlist',
        toolbar_sticky: true,
        block_formats:
            'Paragraph=p; Header 2=h2; Header 3=h3; Header 4=h4; Header 5=h5; Header 6=h6; Blockquote=blockquote; Preformatted=pre',
        elementpath: true,

        image_caption: true,
        file_browser_callback_types: 'file image media',
        file_picker_types: 'file',

        setup: (editor: any) => {
            editor.on('BeforeSetContent', function (e: any) {
                if (e.content.indexOf('<table') == 0) {
                    e.content = '<section>' + e.content + '</section>';
                }
            });

            editor.ui.registry.addToggleButton('formatCodeButton', {
                icon: 'sourcecode',
                onAction: function (_: any) {
                    editor.execCommand('mceToggleFormat', false, 'code');
                },
                onSetup: function (api: any) {
                    editor.formatter.formatChanged('code', function (state: any) {
                        api.setActive(state);
                    });
                },
            });
        },

        file_picker_callback: function (cb: any, value: any, meta: any) {
            if (meta.filetype == 'file') {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', '.zip,.mp4');

                input.onchange = function () {
                    if (!!!input.files) return;
                    let file = input.files[0];

                    m.loading(true);
                    ArticleAPI.uploadContentFile(articleId, file)
                        .then((resp) => {
                            const link = resp?.data?.data ?? '';
                            if (link !== '') {
                                cb(getMediaURL(link), {
                                    title: file.name,
                                    text: file.name,
                                });
                            }
                        })
                        .catch((err) => {})
                        .finally(() => m.loading(false));
                };

                input.click();
            }
        },
    };

    return (
        <Editor
            apiKey={TINYMCE_API_KEY}
            ref={editorRef}
            init={initialConfig}
            onEditorChange={(value: any) => {
                editorRef.current.value = value;
            }}
            value={content}
            disabled={disabled}
        />
    );
};
export default CommentEditor;
