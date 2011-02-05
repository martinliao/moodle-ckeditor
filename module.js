// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * ckEditor helper javascript functions
 *
 * @package    editor_ckeditor
 * @copyright  2010 didier Belot
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

M.editor_ckeditor = M.editor_ckeditor || {};

M.editor_ckeditor.editor_options = M.editor_ckeditor.options || {};
M.editor_ckeditor.filepicker_options = M.editor_ckeditor.filepicker_options || {};

M.editor_ckeditor.init_editor = function(Y, editorid, options) {
    M.editor_ckeditor.editor_options[editorid] = options;
    CKEDITOR.replace(editorid,options);
};

M.editor_ckeditor.init_filepicker = function(Y, editorid, options) {
    M.editor_ckeditor.filepicker_options[editorid] = options;
};

//M.editor_ckeditor.filepicker = function(target_id, url, type, win) {
M.editor_ckeditor.filepicker = function(params) {
    
    YUI(M.yui.loader).use('core_filepicker', function (Y) {
        var editor_id = params.CKEditor;
	var type = params.dlgType;
        var options = null;
        if (type == 'flash') {
            // when mediaw button clicked
            options = M.editor_ckeditor.filepicker_options[editor_id]['media'];
        } else if (type == 'link') {
            // when link button clicked
            options = M.editor_ckeditor.filepicker_options[editor_id]['link'];
        } else if (type == 'image') {
            // when image button clicked
            options = M.editor_ckeditor.filepicker_options[editor_id]['image'];
        } 

        //options.formcallback = M.editor_ckeditor.filepicker_callback;
        //options.editor_target = win.document.getElementById(target_id);
	options.formcallback = function(args) {
	    var fileUrl = args.url;
	    var funcNum = params.CKEditorFuncNum;
	    CKEDITOR.tools.callFunction(funcNum, fileUrl);
	};

        M.core_filepicker.show(Y, options);
    });
};

