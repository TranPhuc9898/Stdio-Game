import { Editor } from '@tinymce/tinymce-react';
import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef } from 'react';

import { TINYMCE_API_KEY } from '@stdio/configs/config';
import { BlobInfo } from '@stdio/configs/custom-types';

interface IProps {
    initialValue: string;
    onSave?: VoidFunction;
    onInsertFile?: (cb: any, value: any, meta: any) => void;
    onInsertImage: (blobInfo: BlobInfo, progress: any) => Promise<string>;
}

const ArticleEditor: ForwardRefRenderFunction<unknown, IProps> = (
    { initialValue, onInsertFile, onInsertImage, onSave },
    ref,
) => {
    const editorRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        getContent: () => {
            return editorRef?.current?.getContent?.() ?? undefined;
        },
    }));

    const initialConfig = {
        entity_encoding: 'raw' as any,
        relative_urls: false,
        branding: false,
        // document_base_url: SITE_URL,
        height: 750,
        menubar: 'file edit view insert format tools table actions',
        plugins: [
            'advlist',
            'autolink',
            'autoresize',
            'codesample',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'table',
            'code',
            'wordcount',
        ],
        toolbar:
            'saveButton | undo redo | blocks | bold italic forecolor backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | table | image link media | \
        formatCodeButton codesample | removeformat | fullscreen preview',
        toolbar_sticky: true,
        toolbar_sticky_offset: 0,
        block_formats:
            'Paragraph=p; Header 2=h2; Header 3=h3; Header 4=h4; Header 5=h5; Header 6=h6; Blockquote=blockquote; Preformatted=pre',
        elementpath: true,

        image_caption: true,
        file_picker_types: 'file image media',

        file_picker_callback: function (cb: any, value: any, meta: any) {
            onInsertFile?.(cb, value, meta);
        },

        setup: (editor: any) => {
            editor.on('BeforeSetContent', function (e: any) {
                if (e.content.indexOf('<table') == 0) {
                    e.content = '<section>' + e.content + '</section>';
                }
            });

            editor.ui.registry.addToggleButton('saveButton', {
                icon: 'save',
                tooltip: 'Save. Shortcut Ctrl/Command + Shift + S',
                onAction: () => {
                    onSave?.();
                },
            });

            editor.ui.registry.addToggleButton('formatCodeButton', {
                icon: 'sourcecode',
                tooltip: 'Code tag. Shortcut Ctrl/Command + Shift + C',
                onAction: function (_: any) {
                    editor.execCommand('mceToggleFormat', false, 'code');
                },
                onSetup: function (api: any) {
                    editor.formatter.formatChanged('code', function (state: any) {
                        api.setActive(state);
                    });
                },
            });

            editor.addShortcut('meta+shift+s', 'Save article', () => {
                onSave?.();
            });

            editor.addShortcut('meta+shift+c', 'Format <code> for selected.', () => {
                editor.execCommand('mceToggleFormat', false, 'code');
            });

            editor.addShortcut('meta+shift+x', 'Format <pre> for selected.', () => {
                editor.execCommand('mceToggleFormat', false, 'pre');
            });
        },

        images_upload_handler: (blobInfo: BlobInfo, progress: any) => {
            return onInsertImage(blobInfo, progress);
        },
    };

    return (
        <Editor
            id={TINYMCE_API_KEY} // vinh.lakien: try to fix id from SSR and client miss match
            apiKey={TINYMCE_API_KEY}
            initialValue={initialValue}
            init={initialConfig}
            onInit={(evt, editor) => (editorRef.current = editor)}
        />
    );
};
export default forwardRef(ArticleEditor);
