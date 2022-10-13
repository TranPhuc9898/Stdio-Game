import { Editor } from '@tinymce/tinymce-react';
import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef } from 'react';

import { TINYMCE_API_KEY } from '@stdio/configs/config';

interface IProps {
    defaultContent?: string;
    placeholder?: string;
    disabled?: boolean;
}

const BasicEditor: ForwardRefRenderFunction<unknown, IProps> = (
    { placeholder = '', defaultContent = '', disabled = false },
    ref,
) => {
    const editorRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        getContent: () => {
            if (editorRef.current) return editorRef.current.getContent();
        },
    }));

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
    };

    return (
        <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey={TINYMCE_API_KEY}
            initialValue={defaultContent}
            init={initialConfig}
            disabled={disabled}
        />
    );
};
export default forwardRef(BasicEditor);
