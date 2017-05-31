/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/6/9 15:12:18 
 * ***********************************************/
Ext.Loader.setPath({
    'FmApp': AppConfig.urlStartWith + 'FmApp',
    'Ext': AppConfig.urlStartWith + 'FmContent/lib/extjs621/src',
    'Ext.ux': AppConfig.urlStartWith + 'FmContent/lib/extjs621/ux',
    'Ext.exporter': AppConfig.urlStartWith + 'FmContent/lib/extjs621/ux/exporter',
    'Ext.draw.ContainerBase': AppConfig.urlStartWith + 'FmContent/lib/extjs621/build/charts.js'
});

//ajax超时时间
Ext.Ajax.setTimeout(AppConfig.ajaxTimeOut);

//设置字体图标
Ext.setGlyphFontFamily('FontAwesome');

//屏蔽输入框 backspace  修正按键导致页面后退的问题
Ext.EventManager.on(window, 'keydown', function (e, t) {
    if (e.getKey() == e.BACKSPACE && (!/^input|textarea$/i.test(t.tagName) || t.disabled || t.readOnly)) {
        e.stopEvent();
    }
});

if (!AppConfig.isDev) {
    //屏蔽警告提示消息
    Ext.log.warn = function () { }

    //忽略Ext部分错误
    Ext.Error.ignore = true;

    window.onerror = function (msg, url, line, l, e) {
        return true;
    }

    //禁用系统缓存更新规则 采用自定义版本缓存规则 提高网络性能(override Ext.js)
    Ext.Loader.setConfig({ disableCaching: false });
}
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/11/18 15:41:16 
 * ***********************************************/
Ext.define("Fm.override.Component", {
    override: "Ext.Component",
    //重置子组件表单
    resetAll: function () {
        var me = this,
            forms = me.query('form'),
            grids = me.query('grid,dataview');
        try {
            var dateFields = [];
            if (me.isForm && !me.isIgnoreReset) {
                me.reset(true);
                if (me.fireEvent) {
                    me.fireEvent('resetallvalue', me);
                }
                dateFields = me.query('datefield');
            }
            Ext.Array.each(forms, function (item) {
                if (!item.isIgnoreReset) {
                    item.reset(true);
                    if (item.fireEvent) {
                        item.fireEvent('resetallvalue', item);
                    }
                    dateFields = Ext.Array.merge(dateFields, item.query('datefield'));
                }
            });
            Ext.Array.each(dateFields, function (field) {
                if (field.isRequirsResetMaxMinValue) {
                    field.setMinValue(0);
                    field.setMaxValue(0);
                }
            });
            Ext.Array.each(grids, function (item) {
                var s = item.getStore();
                if (s && !s.isEmptyStore && s.clearAll && !s.isIgnoreReset) {
                    s.clearAll();
                    s.clearFilter();
                }
            });
        } catch (e) { }
    },
    //针对form表单项的判断：是否为第一次初始化时的绑定值赋值
    isFirstSetBindValue: function (val) {
        var me = this,
            bind,
            valueBind;

        bind = me.getBind();
        valueBind = bind && bind.value;
        if (valueBind && valueBind.syncing) {
            if ((Ext.isEmpty(val) && Ext.isEmpty(me.value)) || val === me.value) {
                return true;
            } else if (Ext.isArray(val) && Ext.isArray(me.value) && Ext.Array.equals(val, me.value)) {
                return true;
            }
        }
        return false;
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/11/18 15:41:16 
 * ***********************************************/
Ext.define("Fm.override.container.Container", {
    override: "Ext.container.Container",
    //获取面板导出excel数据
    getExportData: function (beginRow, beginCol) {
        // beginRow 导出时起始行位置
        // beginCol 导出时起始列位置
        var me = this,
            columns = (me.layout.columns || 0) * 2,
            cells = [],
            beginRow = beginRow || 1,
            beginCol = beginCol || 0,
            row = 0, col = 0, cellcount = 1;

        var _div = document.createElement('div');

        Ext.Array.forEach(me.items.items, function (item) {
            if (!item.hidden) {
                if (col >= columns) {
                    col = 0;
                    row++;
                }
                cells.push({
                    CellValue: item.fieldLabel,
                    RowNumber: beginRow + row,
                    CellNumber: beginCol + col,
                    CellCount: 1,
                    CellType: 'Right'
                });
                col = col + 1;
                cellcount = (item.colspan || 1) * 2 - 1;
                var cellValue = item.renderer ? item.renderer(item.value) : item.value;
                _div.innerHTML = cellValue;
                cellValue = _div.innerText || _div.textContent;

                cells.push({
                    CellValue: cellValue || '',
                    RowNumber: beginRow + row,
                    CellNumber: beginCol + col,
                    CellCount: cellcount
                });
                col = col + cellcount;
            }
        });
        return { Cells: cells, EndRow: beginRow + row, EndCol: beginCol + col };
    },
    //折叠Panel
    foldPanel: function (p) {
        var me = this,
            view = me,
            n = view.down('[region=north]'),
            c = view.down('[region=center]'),
            e = view.down('[region=east]'),
            s = view.down('[region=south]');

        //记录south原高度
        if (s.getHeight() !== 0 && c.getHeight() !== 0) {
            me._southHeight = s.getHeight();
        }
        //设置折叠
        if (p === 'c') {
            s.setHeight(s.getHeight() === 0 ? me._southHeight : 0);
        }
        else if (p === 's') {
            var maxH = view.getHeight();
            s.setHeight(s.getHeight() === maxH
                ? me._southHeight
                : maxH);
        }
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 重写ajax方法 添加异常提示
 * history:  created by 苗建龙 2015/7/3 9:53:59 
 * ***********************************************/
Ext.define("Fm.override.data.Connection", function () {
    var _ajaxRequest = Ext.data.Connection.prototype.request;
    Ext.data.Connection.prototype.request = undefined;
    return {
        override: "Ext.data.Connection",
        request: function (options) {
            options = options || {};
            var me = this,
                scope = options.scope || window;

            var newCall = options.callback;
            options.callback = undefined;

            options.url = (AppConfig.urlStartWith + options.url).replace('//', '/');

            var showLogin = function () {
                application.loginOut();
            }

            var _fmapp_now_mask_view = window._fmapp_now_mask_view + '';
            var _errLang = {
                NetWorkErrorMsg: "网络错误，请检查您的网络。",
                ServerErrorMsg: "服务器异常，请联系管理人员。",
                LoadErrorMsg: "加载出错"
            };
            var callback = function (options, success, response) {
                var responseJson = response.responseJson = { ErrCode: null, ErrMsg: null, IsSuccess: true };

                if ((response.status >= 400 && response.status < 500) || response.status == 0) {
                    responseJson.ErrMsg = _errLang.NetWorkErrorMsg;
                }
                else if (response.status >= 500) {
                    responseJson.ErrMsg = _errLang.ServerErrorMsg;
                } else {
                    if (response.responseText) {
                        var matches = response.responseText.match(/("ErrCode[\s\S]*ErrMsg[\s\S]*),"AttachedObject"/)
                        if (matches && matches.length) {
                            var relStr = '{' + matches[1] + '}';
                            responseJson = Ext.JSON.decode(relStr);
                        }
                    } else {
                        if (success) {
                            responseJson.ErrMsg = _errLang.loadErrorMsg;
                        }
                    }
                }

                responseJson.IsSuccess = !responseJson.ErrMsg;
                if (!responseJson.IsSuccess) {
                    if (responseJson.ErrCode === '1002') {
                        Ext.Msg.alert('登录过期', responseJson.ErrMsg, function () {
                            showLogin();
                        });
                    } else {
                        Fm.msg.error(responseJson.ErrMsg);
                    }
                    try {
                        application.hideMask(_fmapp_now_mask_view);
                    } catch (e) { }
                }
                if (newCall) {
                    newCall.call(scope, options, responseJson.IsSuccess, response);
                }
            }
            options.callback = callback;
            if (!options.error) {
                options.error = function () {
                    application.hideMask(_fmapp_now_mask_view);
                }
            }
            _ajaxRequest.call(me, options);
        }
    };
}());
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/12/21 13:22:38 
 * ***********************************************/
Ext.define("Fm.override.data.field.Date", {
    override: "Ext.data.field.Date",
    convert: function (v) {
        //start 解决日期转换 某些浏览器+8小时的问题
        if (v && Ext.isString(v)) {
            return new Date([v.replace(/-/g, '/').replace(/T|Z/g, ' ')]);
        }
        //end

        return this.callParent(arguments);
    }
});
/* ***********************************************
 * author :  fei85
 * function: 
 * history:  created by fei85 2016/1/21 10:01:25 
 * ***********************************************/
Ext.define("Fm.override.data.validator.Presence", {
    override: "Ext.data.validator.Presence",
    config: {
        message: '必填'
    },
    //非空验证 增加空格 空行验证
    validate: function (value) {
        var valid = !(value === undefined || value === null || value.toString().trim() === '');
        if (valid && !this.getAllowEmpty()) {
            valid = !(value === '');
        }
        return valid ? true : this.getMessage();
    }
});
/* ***********************************************
 * author :  何泽立
 * function: 重写拖拽 树拖动时避免无效拖动造成无法拖动
 * history:  created by 何泽立 2015/10/08
 * ***********************************************/
Ext.define("Fm.override.dd.DragSource", {
    override: "Ext.dd.DragSource",
    onInvalidDrop: function (target, e, id) {
        this.hideProxy();
        delete this.cachedTarget;
    }
});
Ext.define("Fm.override.dd.DD", {
    override: "Ext.dd.DD",
    //低版本ie下不能正常取到拖动代理控件
    configGetFly: function (el) {
        return el.id ? el : el[0];
    },

    alignElWithMouse: function (el, iPageX, iPageY) {
        var oCoord = this.getTargetCoord(iPageX, iPageY),
            el = this.configGetFly(el),
            fly = el.dom ? el : Ext.fly(el, '_dd'),
            elSize = fly.getSize(),
            EL = Ext.Element,
            vpSize,
            aCoord,
            newLeft,
            newTop;

        if (!this.deltaSetXY) {
            vpSize = this.cachedViewportSize = { width: EL.getDocumentWidth(), height: EL.getDocumentHeight() };
            aCoord = [
                Math.max(0, Math.min(oCoord.x, vpSize.width - elSize.width)),
                Math.max(0, Math.min(oCoord.y, vpSize.height - elSize.height))
            ];
            fly.setXY(aCoord);
            newLeft = this.getLocalX(fly);
            newTop = fly.getLocalY();
            this.deltaSetXY = [newLeft - oCoord.x, newTop - oCoord.y];
        } else {
            vpSize = this.cachedViewportSize;
            this.setLocalXY(
                fly,
                Math.max(0, Math.min(oCoord.x + this.deltaSetXY[0], vpSize.width - elSize.width)),
                Math.max(0, Math.min(oCoord.y + this.deltaSetXY[1], vpSize.height - elSize.height))
            );
        }

        this.cachePosition(oCoord.x, oCoord.y);
        this.autoScroll(oCoord.x, oCoord.y, el.offsetHeight, el.offsetWidth);
        return oCoord;
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 解决CheckboxGroup的绑定格式问题
 *           支持绑定数组
 * history:  created by 苗建龙 2015/9/29 14:20:11 
 * ***********************************************/
Ext.define("Fm.override.form.CheckboxGroup", {
    override: "Ext.form.CheckboxGroup",
    twoWayBindable: ['value'],
    defaultBindProperty: 'value',
    valuePublishEvent: 'updatebindvalue',
    getValue: function () {
        var values = [],
            boxes = this.getBoxes(),
            box,
            inputValue;

        for (var b = 0; b < boxes.length; b++) {
            box = boxes[b];
            inputValue = box.inputValue;
            if (box.getValue()) {
                values.push(inputValue);
            }
        }

        return values;
    },
    checkChange: function (box, newValue) {
        this.fireEvent('updatebindvalue');
    },
    setValue: function (value) {
        if (value === null || value === undefined || !Ext.isArray(value)) {
            return;
        }

        var me = this,
            boxes = me.getBoxes(),
            values = me.values,
            b,
            bLen = boxes.length,
            box, name,
            cbValue;

        me.batchChanges(function () {
            Ext.suspendLayouts();
            for (b = 0; b < bLen; b++) {
                box = boxes[b];
                cbValue = false;

                if (value) {
                    if (Ext.isArray(value)) {
                        cbValue = Ext.Array.contains(value, box.inputValue);
                    } else {
                        cbValue = value;
                    }
                }
                box.setValue(cbValue);
            }
            Ext.resumeLayouts(true);
        });

        return me;
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/12/18 14:35:10 
 * ***********************************************/
Ext.define("Fm.override.form.field.Base", {
    override: "Ext.form.field.Base",
    validateValue: function (value) {
        var me = this,
            errors = me.getErrors(value),
            isValid = Ext.isEmpty(errors);

        if (!me.preventMark) {
            if (isValid) {
                me.clearInvalid();
            } else {
                //start 解决 bind value 验证有错误时出现各种问题的 bug
                if (me.bind && me.bind.value && me.bind.value.setValue) {
                    me.bind.value.setValue(me.getValue())
                }
                //end
                me.markInvalid(errors);
            }
        }

        return isValid;
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/9/24 14:16:30 
 * ***********************************************/
Ext.define("Fm.override.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    editable: false,
    showClearTriggers: true,
    emptyText: '全部',
    //是否在单选的时候返回数组
    singleIsArray: false,
    //添加全局清除按钮
    applyTriggers: function (triggers) {
        var me = this,
            picker = triggers.picker,
            newTriggers = {};

        if (picker && !picker.cls) {
            picker.cls = me.triggerCls;
        }

        if (me.showClearTriggers) {
            newTriggers["clear"] = {
                cls: 'cisapp-form-field-clear',
                renderTpl: '<div id="{triggerId}" class="{baseCls} {baseCls}-{ui} {cls}"></div>',
                handler: function () {
                    if (this.clearValue) {
                        this.clearValue();
                    }
                    if (this.clearTreeChecked) {
                        this.clearTreeChecked();
                    }
                    me.fireEvent('change', me);
                },
                scope: 'this'
            };
        }
        for (var t in triggers) {
            newTriggers[t] = triggers[t];
        }
        return me.callParent([newTriggers]);
    },
    getValue: function () {
        var me = this;

        var value = me.callParent(arguments);

        if (!me.multiSelect && me.singleIsArray && value) {
            return [value];
        }
        return value;
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/12/11 13:21:06 
 * ***********************************************/
Ext.define("Fm.override.form.field.Date", {
    override: "Ext.form.field.Date",
    format: 'Y-m-d',
    formatText: '日期格式要求为: 年-月-日',
    invalidText: "{0} 是无效的日期 必须符合格式：年-月-日",
    valuePublishEvent: ['select', 'blur', 'updatebind'],
    validateOnChange: false,
    isRequirsResetMaxMinValue: false,
    initComponent: function () {
        var me = this;

        me.callParent();

        //重写验证机制
        var validateEvents = ['blur', 'select', 'validateforreset'];
        var validateFn = function (field, e) {
            me.validate();
        }
        Ext.Array.each(validateEvents, function (eventName) {
            me.on(eventName, validateFn);
        });
        me.on('specialkey', function (field, e) {
            if (e.getKey() == e.ENTER) {
                me.validate();
            }
        });

        //先判断change事件是否存在，如果存在，则在change事件追加事件处理
        if (!me.hasListener('change')) {
            me.on('change', me.autoFormat);
        } else {
            me.onAfter('change', me.autoFormat);
        }
    },
    checkDate: function (date) {
        if (date instanceof Date) {
            return true;
        }
        if (date) {
            return (new Date(date).getDate() == date.toString().substring(date.length - 2));
        }
        return false;
    },
    //手动输入的时候自动补填 - 
    autoFormat: function (obj, newValue) {
        var value;

        if (newValue) {
            var isAlreadyDate = this.checkDate(newValue);
            if (!isAlreadyDate) {
                dateString = newValue.toString().replace(/-/g, '');
                switch (dateString.length) {
                    case 5:
                        value = dateString.substr(0, 4) + '-' + dateString.substr(4, 1);
                        break;
                    case 6:
                        value = dateString.substr(0, 4) + '-' + dateString.substr(4, 2);
                        break;
                    case 7:
                        var value = dateString.substr(0, 4) + '-' + dateString.substr(4, 2) + '-' + dateString.substr(6, 1);
                        break;
                    case 8:
                        value = dateString.substr(0, 4) + '-' + dateString.substr(4, 2) + '-' + dateString.substr(6, 2);
                        obj.fireEvent('blur', obj);
                        break;
                    default:
                        return;
                }
                obj.setRawValue(value);
            } else {
                if (obj.rawValue.length === 10) {
                    obj.fireEvent('blur', obj);
                }
            }
        }
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/12/11 13:14:04 
 * ***********************************************/
Ext.define("Fm.override.form.field.Number", {
    override: "Ext.form.field.Number",
    repeatTriggerClick: false,
    decimalPrecision: 2,
    maxValue: 9999999999999,
    initComponent: function () {
        var me = this;
        me.callParent();
        //输入过程中验证最大、最小值的小数位
        me.on({
            change: function (field, value) {
                if (value === '-') {
                    return;
                }
                var _v = me.parseValue(Ext.Number.constrain(value, field.minValue, field.maxValue));
                if (_v) {
                    _v = _v.toFixed(me.decimalPrecision)
                }
                me.setValue(_v);
            }
        });
    }
});
/* ***********************************************
 * author :  fei85
 * function: 
 * history:  created by fei85 2016/1/22 9:48:19 
 * ***********************************************/
Ext.define("Fm.override.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    //日期 验证范围
    daterange: function (val, field) {
        var date = field.parseDate(val);

        if (!date) {
            return false;
        }

        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = field.up('daterange').down('#' + field.startDateField) || Ext.getCmp(field.startDateField);
            start.setMaxValue(date);
            //start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField) {
            var end = field.up('daterange').down('#' + field.endDateField) || Ext.getCmp(field.endDateField);
            end.setMinValue(date);
        }

        return true;
    },
    daterangeText: '开始日期必须小于结束日期',
    //数字 验证范围
    numberrange: function (val, field) {
        var num = parseFloat(val);
        if (field.startNumberField) {
            var sd = field.up('fieldcontainer').down('#' + field.startNumberField) || Ext.getCmp(field.startNumberField);
            sd.maxValue = num;
        }
        else if (field.endNumberField) {
            var ed = field.up('fieldcontainer').down('#' + field.endNumberField) || Ext.getCmp(field.endNumberField);
            ed.minValue = num;
        }
        return true;
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 增加click事件
 * history:  created by 苗建龙 2015/11/23 16:01:22 
 * ***********************************************/
Ext.define("Fm.override.form.Label", {
    override: "Ext.form.Label",
    clickEvent: 'click',
    onRender: function () {
        var me = this;

        me.callParent(arguments);

        // Set btn as a local variable for easy access
        me.el.on({
            click: me.onClick,
            scope: me
        });
    },
    doPreventDefault: function (e) {
        if (e && (this.preventDefault || (this.disabled && this.getHref()))) {
            e.preventDefault();
        }
    },
    onClick: function (e) {
        var me = this;
        me.doPreventDefault(e);
        // Click may have destroyed the button
        if (me.fireEvent('click', me, e) !== false && !me.destroyed) {
            Ext.callback(me.handler, me.scope, [me, e], 0, me);
        }
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/12/11 13:25:27 
 * ***********************************************/
Ext.define("Fm.override.form.Panel", {
    override: "Ext.form.Panel",
    //增加判断是否form属性
    isForm: true,
    //批量清空的时候是否忽略
    isIgnoreReset: false
});
/* ***********************************************
 * author :  苗建龙
 * function: 解决RadioGroup的绑定格式问题 支持绑定value
 * history:  created by 苗建龙 2015/9/29 14:20:11 
 * ***********************************************/
Ext.define("Fm.override.form.RadioGroup", {
    override: "Ext.form.RadioGroup",
    valuePublishEvent: 'updatebindvalue',
    checkChange: function () {
        this.fireEvent('updatebindvalue');
    },
    getValue: function () {
        var value = null,
            boxes = this.getBoxes(),
            box,
            inputValue;

        for (var b = 0; b < boxes.length; b++) {
            box = boxes[b];
            inputValue = box.inputValue;
            if (box.getValue() === true) {
                value = inputValue;
            }
        }

        return value;
    },
    setValue: function (value) {
        if (value === null || value === undefined) {
            return;
        }
        var me = this,
            radios = me.getBoxes(),
            radio;

        Ext.suspendLayouts();
        for (var i = 0; i < radios.length; ++i) {
            radio = radios[i];
            if (value === radio.inputValue) {
                radio.setValue(true);
            } else {
                radio.setValue(false);
            }
        }
        Ext.resumeLayouts(true);

        return me;
    }
});
/* ***********************************************
 * author :  fei85
 * function: 
 * history:  created by fei85 2016/9/21 9:45:54 
 * ***********************************************/
Ext.define("Fm.override.grid.column.Column", {
    override: "Ext.grid.column.Column",
    //禁用列动态隐藏功能
    hideable: false,
    menuDisabled: true,
    //tooltip提示配置
    showTip: false,
    initComponent: function () {
        var me = this;
        //增加tooltip提示配置  showTip
        if (me.showTip) {
            if (me.renderer && !me.renderer.$emptyFn) {
                var oRenderer = me.renderer;
                me.renderer = function (v, metadata, record, rowIndex, collIndex, store, view) {
                    var _v = oRenderer(v, metadata, record, rowIndex, collIndex, store, view);
                    if (_v !== null && _v !== undefined && metadata !== null) {
                        if (!metadata.tdAttr) {
                            metadata.tdAttr = 'data-qtip="' + _v + '"';
                        }
                    }
                    return _v;
                }
            } else {
                me.renderer = function (v, metadata) {
                    if (v !== null && v !== undefined && metadata !== null) {
                        metadata.tdAttr = 'data-qtip="' + v + '"';
                    }
                    return v;
                }
            }
        }

        me.callParent();
    },
    //排序增加到3种状态 升序-降序-取消
    sort: function (direction) {
        var me = this,
            grid = me.up('tablepanel'),
            store = grid.store,
            sorters = store.getSorters(),
            sorter = me.getSorter();

        // Maintain backward compatibility. 
        // If the grid is NOT configured with multi column sorting, then specify "replace". 
        // Only if we are doing multi column sorting do we insert it as one of a multi set. 
        // Suspend layouts in case multiple views depend upon this grid's store (eg lockable assemblies) 
        Ext.suspendLayouts();
        if (me.sortState === 'DESC') {
            sorters.remove(me.getSortParam());
            me.sortState = '';
            if (sorters.length === 0) {
                var _s = Ext.create('Ext.util.Sorter', {
                    sorterFn: function (record1, record2) {
                        return record1.internalId > record2.internalId ? 1 : -1;
                    }
                });
                store.sort(_s);
            } else {
                store.setSorters(sorters.items);
            }
        } else {
            if (sorter) {
                if (direction) {
                    sorter.setDirection(direction);
                }
                store.sort(sorter, grid.multiColumnSort ? 'multi' : 'replace');
            } else {
                store.sort(me.getSortParam(), direction, grid.multiColumnSort ? 'multi' : 'replace');
            }
        }
        Ext.resumeLayouts(true);
    }
});
/* ***********************************************
 * author :  fei85
 * function: 表格序号列
 * history:  created by fei85 2016/9/21 9:46:59 
 * ***********************************************/
Ext.define("Fm.override.grid.column.RowNumberer", {
    override: "Ext.grid.column.RowNumberer",
    align: 'center',
    resizable: true,
    width: 50
});
/**
 * A widget column is configured with a {@link #widget} config object which specifies an
 * {@link Ext.Component#cfg-xtype xtype} to indicate which type of Widget or Component belongs
 * in the cells of this column.
 *
 * When a widget cell is rendered, a {@link Ext.Widget Widget} or {@link Ext.Component Component} of the specified type
 * is rendered into that cell. Its {@link Ext.Component#defaultBindProperty defaultBindProperty} is set using this
 * column's {@link #dataIndex} field from the associated record.
 *
 * In the example below we are monitoring the throughput of electricity substations. The capacity being
 * used as a proportion of the maximum rated capacity is displayed as a progress bar. As new data arrives and the
 * instantaneous usage value is updated, the `capacityUsed` field updates itself, and
 * that is used as the {@link #dataIndex} for the `WidgetColumn` which contains the
 * progress bar. The progress Bar's
 * {@link Ext.ProgressBarWidget#defaultBindProperty defaultBindProperty} (which is
 * "value") is set to the calculated `capacityUsed`.
 *
 *     @example
 *     var grid = new Ext.grid.Panel({
 *         title: 'Substation power monitor',
 *         width: 600,
 *         columns: [{
 *             text: 'Id',
 *             dataIndex: 'id',
 *             width: 120
 *         }, {
 *             text: 'Rating',
 *             dataIndex: 'maxCapacity',
 *             width: 80
 *         }, {
 *             text: 'Avg.',
 *             dataIndex: 'avg',
 *             width: 85,
 *             formatter: 'number("0.00")'
 *         }, {
 *             text: 'Max',
 *             dataIndex: 'max',
 *             width: 80
 *         }, {
 *             text: 'Instant',
 *             dataIndex: 'instant',
 *             width: 80
 *         }, {
 *             text: '%Capacity',
 *             width: 150,
 *
 *             // This is our Widget column
 *             xtype: 'widgetcolumn',
 *             dataIndex: 'capacityUsed',
 *
 *             // This is the widget definition for each cell.
 *             // Its "value" setting is taken from the column's dataIndex
 *             widget: {
 *             xtype: 'progressbarwidget',
 *                 textTpl: [
 *                     '{percent:number("0")}% capacity'
 *                 ]
 *             }
 *         }],
 *         renderTo: document.body,
 *         disableSelection: true,
 *         store: {
 *            fields: [{
 *                name: 'id',
 *                type: 'string'
 *            }, {
 *                name: 'maxCapacity',
 *                type: 'int'
 *            }, {
 *                name: 'avg',
 *                type: 'int',
 *                calculate: function(data) {
 *                    // Make this depend upon the instant field being set which sets the sampleCount and total.
 *                    // Use subscript format to access the other pseudo fields which are set by the instant field's converter
 *                    return data.instant && data['total'] / data['sampleCount'];
 *                }
 *            }, {
 *                name: 'max',
 *                type: 'int',
 *                calculate: function(data) {
 *                    // This will be seen to depend on the "instant" field.
 *                    // Use subscript format to access this field's current value to avoid circular dependency error.
 *                    return (data['max'] || 0) < data.instant ? data.instant : data['max'];
 *                }
 *            }, {
 *                name: 'instant',
 *                type: 'int',
 *
 *                // Upon every update of instantaneous power throughput,
 *                // update the sample count and total so that the max field can calculate itself
 *                convert: function(value, rec) {
 *                    rec.data.sampleCount = (rec.data.sampleCount || 0) + 1;
 *                    rec.data.total = (rec.data.total || 0) + value;
 *                    return value;
 *                },
 *               depends: []
 *            }, {
 *                name: 'capacityUsed',
 *                calculate: function(data) {
 *                    return data.instant / data.maxCapacity;
 *                }
 *            }],
 *            data: [{
 *                id: 'Substation A',
 *                maxCapacity: 1000,
 *                avg: 770,
 *                max: 950,
 *                instant: 685
 *            }, {
 *                id: 'Substation B',
 *                maxCapacity: 1000,
 *                avg: 819,
 *                max: 992,
 *                instant: 749
 *            }, {
 *                id: 'Substation C',
 *                maxCapacity: 1000,
 *                avg: 588,
 *                  max: 936,
 *                instant: 833
 *            }, {
 *                id: 'Substation D',
 *                maxCapacity: 1000,
 *                avg: 639,
 *                max: 917,
 *                instant: 825
 *            }]
 *        }
 *     });
 *
 *     // Fake data updating...
 *     // Change one record per second to a random power value
 *     Ext.interval(function() {
 *         var recIdx = Ext.Number.randomInt(0, 3),
 *             newPowerReading = Ext.Number.randomInt(500, 1000);
 *
 *         grid.store.getAt(recIdx).set('instant', newPowerReading);
 *     }, 1000);
 *
 * @since 5.0.0
 */
//这里保留6.0.0的组件  6.20的卡
Ext.define('Ext.grid.column.Widget', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.widgetcolumn',

    config: {
        /**
         * @cfg defaultWidgetUI
         * A map of xtype to {@link Ext.Component#ui} names to use when using Components in this column.
         *
         * Currently {@link Ext.Button Button} and all subclasses of {@link Ext.form.field.Text TextField} default
         * to using `ui: "default"` when in a WidgetColumn except for in the "classic" theme, when they use ui "grid-cell".
         */
        defaultWidgetUI: {}
    },

    /**
     * @cfg {Boolean} ignoreExport 
     * @inheritdoc
     */
    ignoreExport: true,

    /**
     * @cfg
     * @inheritdoc
     */
    sortable: false,

    /**
     * @cfg {Object} renderer 
     * @hide
     */

    /**
     * @cfg {Object} scope 
     * @hide
     */

    /**
     * @cfg {Object} widget 
     * A config object containing an {@link Ext.Component#cfg-xtype xtype}.
     *
     * This is used to create the widgets or components which are rendered into the cells of this column.
     *
     * This column's {@link #dataIndex} is used to update the widget/component's {@link Ext.Component#defaultBindProperty defaultBindProperty}.
     *
     * The widget will be decorated with 2 methods:
     * `getWidgetRecord` - Returns the {@link Ext.data.Model record} the widget is associated with.
     * `getWidgetColumn` - Returns the {@link Ext.grid.column.Widget column} the widget 
     * was associated with.
     */

    /**
     * @cfg {Function/String} onWidgetAttach
     * A function that will be called when a widget is attached to a record. This may be useful for
     * doing any post-processing.
     * @param {Ext.grid.column.Column} column The column.
     * @param {Ext.Component/Ext.Widget} widget The {@link #widget} rendered to each cell.
     * @param {Ext.data.Model} record The record used with the current widget (cell).
     * @declarativeHandler
     */
    onWidgetAttach: null,

    /**
     * @cfg {Boolean} [stopSelection=true]
     * Prevent grid selection upon click on the widget.
     */
    stopSelection: true,

    preventUpdate: true,

    initComponent: function () {
        var me = this,
            widget;

        me.callParent(arguments);

        widget = me.widget;
        //<debug> 
        if (!widget || widget.isComponent) {
            Ext.raise('column.Widget requires a widget configuration.');
        }
        //</debug> 
        me.widget = widget = Ext.apply({}, widget);

        // Apply the default UI for the xtype which is going to feature in this column. 
        if (!widget.ui) {
            widget.ui = me.getDefaultWidgetUI()[widget.xtype] || 'default';
        }
        me.isFixedSize = Ext.isNumber(widget.width);
    },

    processEvent: function (type, view, cell, recordIndex, cellIndex, e, record, row) {
        var target;

        if (this.stopSelection && type === 'click') {
            // Grab the target that matches the cell inner selector. If we have a target, then, 
            // that means we either clicked on the inner part or the widget inside us. If  
            // target === e.target, then it was on the cell, so it's ok. Otherwise, inside so 
            // prevent the selection from happening 
            target = e.getTarget(view.innerSelector);
            if (target && target !== e.target) {
                e.stopSelection = true;
            }
        }
    },

    beforeRender: function () {
        var me = this,
            tdCls = me.tdCls,
            widget;

        me.listenerScopeFn = function (defaultScope) {
            if (defaultScope === 'this') {
                return this;
            }
            return me.resolveListenerScope(defaultScope);
        };

        me.liveWidgets = {};
        me.cachedStyles = {};
        me.freeWidgetStack = [widget = me.getFreeWidget()];

        tdCls = tdCls ? tdCls + ' ' : '';
        me.tdCls = tdCls + widget.getTdCls();
        me.setupViewListeners(me.getView());
        me.callParent();
    },

    afterRender: function () {
        var view = this.getView();

        this.callParent();
        // View already ready, means we were added later so go and set up our widgets, but if the grid 
        // is reconfiguring, then the column will be rendered & the view will be ready, so wait until 
        // the reconfigure forces a refresh 
        if (view && view.viewReady && !view.ownerGrid.reconfiguring) {
            this.onViewRefresh(view, view.getViewRange());
        }
    },

    // Cell must be left blank 
    defaultRenderer: Ext.emptyFn,

    updater: function (cell, value, record) {
        this.updateWidget(record);
    },

    onResize: function (newWidth) {
        var me = this,
            liveWidgets = me.liveWidgets,
            view = me.getView(),
            id, cell;

        if (!me.isFixedSize && me.rendered && view && view.viewReady) {
            cell = view.getEl().down(me.getCellInnerSelector());
            if (cell) {
                // Subtract innerCell padding width 
                newWidth -= parseInt(me.getCachedStyle(cell, 'padding-left'), 10) + parseInt(me.getCachedStyle(cell, 'padding-right'), 10);

                for (id in liveWidgets) {
                    liveWidgets[id].setWidth(newWidth);
                }
            }
        }
    },

    onAdded: function () {
        var me = this,
            view;

        me.callParent(arguments);

        view = me.getView();

        // If we are being added to a rendered HeaderContainer 
        if (view) {
            me.setupViewListeners(view);

            if (view && view.viewReady && me.rendered && view.getEl().down(me.getCellSelector())) {
                // If the view is ready, it means we're already rendered. 
                // At this point the view may refresh "soon", however we don't have 
                // a way of knowing that the view is pending a refresh, so we need 
                // to ensure the widgets get hooked up correctly here 
                me.onViewRefresh(view, view.getViewRange());
            }
        }
    },

    onRemoved: function (isDestroying) {
        var me = this,
            liveWidgets = me.liveWidgets,
            viewListeners = me.viewListeners,
            id;

        if (me.rendered) {
            me.viewListeners = viewListeners && Ext.destroy(viewListeners);

            // If we are being removed, we have to move all widget elements into the detached body 
            if (!isDestroying) {
                for (id in liveWidgets) {
                    liveWidgets[id].detachFromBody();
                }
            }
        }
        me.callParent(arguments);
    },

    onDestroy: function () {
        var me = this,
            oldWidgetMap = me.liveWidgets,
            freeWidgetStack = me.freeWidgetStack,
            id, widget, i, len;

        if (me.rendered) {
            for (id in oldWidgetMap) {
                widget = oldWidgetMap[id];
                widget.$widgetRecord = widget.$widgetColumn = null;
                delete widget.getWidgetRecord;
                delete widget.getWidgetColumn;
                widget.destroy();
            }

            for (i = 0, len = freeWidgetStack.length; i < len; ++i) {
                freeWidgetStack[i].destroy();
            }
        }

        me.freeWidgetStack = me.liveWidgets = null;

        me.callParent();
    },

    getWidget: function (record) {
        var liveWidgets = this.liveWidgets,
            widget;

        if (record && liveWidgets) {
            widget = liveWidgets[record.internalId];
        }
        return widget || null;
    },

    privates: {
        getCachedStyle: function (el, style) {
            var cachedStyles = this.cachedStyles;
            return cachedStyles[style] || (cachedStyles[style] = Ext.fly(el).getStyle(style));
        },

        getFreeWidget: function () {
            var me = this,
                result = me.freeWidgetStack ? me.freeWidgetStack.pop() : null;

            if (!result) {
                result = Ext.widget(me.widget);

                result.resolveListenerScope = me.listenerScopeFn;
                result.getWidgetRecord = me.widgetRecordDecorator;
                result.getWidgetColumn = me.widgetColumnDecorator;
                result.dataIndex = me.dataIndex;
                result.measurer = me;
                result.ownerCmp = me.getView();
                // The ownerCmp of the widget is the encapsulating view, which means it will be considered 
                // as a layout child, but it isn't really, we always need the layout on the 
                // component to run if asked. 
                result.isLayoutChild = me.returnFalse;
            }
            return result;
        },

        onBeforeRefresh: function () {
            var liveWidgets = this.liveWidgets,
                id;

            // Because of a memory leak bug in IE 8, we need to handle the dom node here before 
            // it is destroyed. 
            // See EXTJS-14874. 
            for (id in liveWidgets) {
                liveWidgets[id].detachFromBody();
            }
        },

        onItemAdd: function (records, index, items) {
            var me = this,
                view = me.getView(),
                hasAttach = !!me.onWidgetAttach,
                dataIndex = me.dataIndex,
                isFixedSize = me.isFixedSize,
                len = records.length, i,
                record,
                row,
                cell,
                widget,
                el,
                focusEl,
                width;

            // Loop through all records added, ensuring that our corresponding cell in each item 
            // has a Widget of the correct type in it, and is updated with the correct value from the record. 
            if (me.isVisible(true)) {
                for (i = 0; i < len; i++) {
                    record = records[i];
                    if (record.isNonData) {
                        continue;
                    }

                    row = view.getRowFromItem(items[i]);

                    // May be a placeholder with no data row 
                    if (row) {
                        cell = row.cells[me.getVisibleIndex()].firstChild;
                        if (!isFixedSize && !width) {
                            width = me.lastBox.width - parseInt(me.getCachedStyle(cell, 'padding-left'), 10) - parseInt(me.getCachedStyle(cell, 'padding-right'), 10);
                        }

                        widget = me.liveWidgets[record.internalId] = me.getFreeWidget();
                        widget.$widgetColumn = me;
                        widget.$widgetRecord = record;

                        // Render/move a widget into the new row 
                        Ext.fly(cell).empty();

                        // Call the appropriate setter with this column's data field 
                        if (widget.defaultBindProperty && dataIndex) {
                            widget.setConfig(widget.defaultBindProperty, record.get(dataIndex));
                        }

                        if (hasAttach) {
                            Ext.callback(me.onWidgetAttach, me.scope, [me, widget, record], 0, me);
                        }

                        el = widget.el || widget.element;
                        if (el) {
                            cell.appendChild(el.dom);
                            if (!isFixedSize) {
                                widget.setWidth(width);
                            }
                            widget.reattachToBody();
                        } else {
                            if (!isFixedSize) {
                                widget.width = width;
                            }
                            widget.render(cell);
                        }

                        // If the widget has a focusEl, ensure that its tabbability status is synched with the view's 
                        // navigable/actionable state. 
                        focusEl = widget.getFocusEl();
                        if (focusEl) {
                            if (view.actionableMode) {
                                if (!focusEl.isTabbable()) {
                                    focusEl.restoreTabbableState();
                                }
                            } else {
                                if (focusEl.isTabbable()) {
                                    focusEl.saveTabbableState();
                                }
                            }
                        }
                    }
                }
            }
        },

        onItemRemove: function (records, index, items) {
            var me = this,
                liveWidgets = me.liveWidgets,
                widget, item, id, len, i, focusEl;

            if (me.rendered) {

                // Single item or Array. 
                items = Ext.Array.from(items);
                len = items.length;

                for (i = 0; i < len; i++) {
                    item = items[i];

                    // If there was a record ID (collapsed placeholder will no longer be  
                    // accessible)... return ousted widget to free stack, and move its element  
                    // to the detached body 
                    id = item.getAttribute('data-recordId');
                    if (id && (widget = liveWidgets[id])) {
                        delete liveWidgets[id];
                        me.freeWidgetStack.unshift(widget);
                        widget.$widgetRecord = widget.$widgetColumn = null;

                        // Focusables in a grid must not be tabbable by default when they get put back in. 
                        focusEl = widget.getFocusEl();
                        if (focusEl) {
                            if (focusEl.isTabbable()) {
                                focusEl.saveTabbableState();
                            }

                            // Some browsers do not deliver a focus change upon DOM removal. 
                            // Force the issue here. 
                            focusEl.blur();
                        }

                        widget.detachFromBody();
                    }
                }
            }
        },

        onItemUpdate: function (record, recordIndex, oldItemDom) {
            this.updateWidget(record);
        },

        onViewRefresh: function (view, records) {
            var me = this,
                rows = view.all,
                hasAttach = !!me.onWidgetAttach,
                oldWidgetMap = me.liveWidgets,
                dataIndex = me.dataIndex,
                isFixedSize = me.isFixedSize,
                cell, widget, el, width, recordId,
                itemIndex, recordIndex, record, id, lastBox, dom;

            if (me.isVisible(true)) {
                me.liveWidgets = {};
                Ext.suspendLayouts();
                for (itemIndex = rows.startIndex, recordIndex = 0; itemIndex <= rows.endIndex; itemIndex++ , recordIndex++) {
                    record = records[recordIndex];
                    if (record.isNonData) {
                        continue;
                    }

                    recordId = record.internalId;
                    cell = view.getRow(rows.item(itemIndex)).cells[me.getVisibleIndex()].firstChild;

                    // Attempt to reuse the existing widget for this record. 
                    widget = me.liveWidgets[recordId] = oldWidgetMap[recordId] || me.getFreeWidget();
                    widget.$widgetRecord = record;
                    widget.$widgetColumn = me;
                    delete oldWidgetMap[recordId];

                    lastBox = me.lastBox;
                    if (lastBox && !isFixedSize && width === undefined) {
                        width = lastBox.width - parseInt(me.getCachedStyle(cell, 'padding-left'), 10) - parseInt(me.getCachedStyle(cell, 'padding-right'), 10);
                    }

                    // Call the appropriate setter with this column's data field 
                    if (widget.defaultBindProperty && dataIndex) {
                        widget.setConfig(widget.defaultBindProperty, records[recordIndex].get(dataIndex));
                    }
                    if (hasAttach) {
                        Ext.callback(me.onWidgetAttach, me.scope, [me, widget, record], 0, me);
                    }

                    el = widget.el || widget.element;
                    if (el) {
                        dom = el.dom;
                        if (dom.parentNode !== cell) {
                            Ext.fly(cell).empty();
                            cell.appendChild(el.dom);
                        }
                        if (!isFixedSize) {
                            widget.setWidth(width);
                        }
                        widget.reattachToBody();
                    } else {
                        if (!isFixedSize) {
                            widget.width = width;
                        }
                        Ext.fly(cell).empty();
                        widget.render(cell);
                    }
                }

                Ext.resumeLayouts(true);

                // Free any unused widgets from the old live map. 
                // Move them into detachedBody. 
                for (id in oldWidgetMap) {
                    widget = oldWidgetMap[id];
                    widget.$widgetRecord = widget.$widgetColumn = null;
                    me.freeWidgetStack.unshift(widget);
                    widget.detachFromBody();
                }
            }
        },

        returnFalse: function () {
            return false;
        },

        setupViewListeners: function (view) {
            var me = this;

            me.viewListeners = view.on({
                refresh: me.onViewRefresh,
                itemupdate: me.onItemUpdate,
                itemadd: me.onItemAdd,
                itemremove: me.onItemRemove,
                scope: me,
                destroyable: true
            });

            if (Ext.isIE8) {
                view.on('beforerefresh', me.onBeforeRefresh, me);
            }
        },

        updateWidget: function (record) {
            var dataIndex = this.dataIndex,
                widget;

            if (this.rendered) {
                widget = this.liveWidgets[record.internalId];
                // Call the appropriate setter with this column's data field 
                if (widget && widget.defaultBindProperty && dataIndex) {
                    widget.setConfig(widget.defaultBindProperty, record.get(dataIndex));
                }
            }
        },

        widgetRecordDecorator: function () {
            return this.$widgetRecord;
        },

        widgetColumnDecorator: function () {
            return this.$widgetColumn;
        }
    }
});
/* ***********************************************
 * author :  fei85
 * function: 增加多属性绑定
 * history:  created by fei85 2016/9/21 9:47:24 

 6.20 新版ext框架 可用官方 onWidgetAttach 方法取代  这里只做兼容
 {
        xtype: 'widgetcolumn',
        text: 'Honor Roll',
        dataIndex: 'isHonorStudent',
        width: 150,
        widget: {
            xtype: 'button',
            handler: function() {
                
            }
        },
        onWidgetAttach: function(col, widget, rec) {
            widget.setText('Print Certificate');
            widget.setDisabled(!rec.get('isHonorStudent'));
        }
}
 * ***********************************************/
Ext.define("Fm.override.grid.column.Widget", {
    override: "Ext.grid.column.Widget",
    sortable: true,
    ignoreExport: false,
    setWidgetVal: function (widget, record) {
        var dataIndex = this.dataIndex;
        if (widget && this.rendered) {
            if (widget.cisBindProperty) {
                Ext.log.warn('此方法(widgetcolumn:cisBindProperty配置)不建议继续使用，替代：onWidgetAttach', 'warn');
                //增加多属性绑定
                var _temp = {};
                for (var _key in widget.cisBindProperty) {
                    var _val = record.get(widget.cisBindProperty[_key].dataIndex);
                    if (widget.cisBindProperty[_key].renderer) {
                        _val = widget.cisBindProperty[_key].renderer(_val, record);

                    }
                    _temp[_key] = _val;
                    widget.setConfig(_temp);
                }
            } else {
                if (widget.defaultBindProperty && dataIndex) {
                    var _val = record.get(dataIndex);
                    //增加renderer
                    if (widget.renderer) {
                        _val = widget.renderer(_val, record);
                    }
                    widget.setConfig(widget.defaultBindProperty, _val);
                }
            }
            widget.updateLayout();
        }
    },
    privates: {
        updateWidget: function (record) {
            var dataIndex = this.dataIndex,
                widget;

            if (this.rendered) {
                widget = this.liveWidgets[record.internalId];
                if (widget) {
                    this.setWidgetVal(widget, record);
                }
            }
        },

        onItemAdd: function (records, index, items) {
            var me = this,
                view = me.getView(),
                hasAttach = !!me.onWidgetAttach,
                dataIndex = me.dataIndex,
                isFixedSize = me.isFixedSize,
                len = records.length, i,
                record,
                row,
                cell,
                widget,
                el,
                focusEl,
                width;

            // Loop through all records added, ensuring that our corresponding cell in each item 
            // has a Widget of the correct type in it, and is updated with the correct value from the record. 
            if (me.isVisible(true)) {
                for (i = 0; i < len; i++) {
                    record = records[i];
                    if (record.isNonData) {
                        continue;
                    }

                    row = view.getRowFromItem(items[i]);

                    // May be a placeholder with no data row 
                    if (row) {
                        cell = row.cells[me.getVisibleIndex()].firstChild;
                        if (!isFixedSize && !width) {
                            width = me.lastBox.width - parseInt(me.getCachedStyle(cell, 'padding-left'), 10) - parseInt(me.getCachedStyle(cell, 'padding-right'), 10);
                        }

                        widget = me.liveWidgets[record.internalId] = me.getFreeWidget();
                        widget.$widgetColumn = me;
                        widget.$widgetRecord = record;

                        // Render/move a widget into the new row 
                        Ext.fly(cell).empty();

                        //修改
                        if (widget) {
                            this.setWidgetVal(widget, record);
                        }

                        if (hasAttach) {
                            Ext.callback(me.onWidgetAttach, me.scope, [me, widget, record], 0, me);
                        }

                        el = widget.el || widget.element;
                        if (el) {
                            cell.appendChild(el.dom);
                            if (!isFixedSize) {
                                widget.setWidth(width);
                            }
                            widget.reattachToBody();
                        } else {
                            if (!isFixedSize) {
                                widget.width = width;
                            }
                            widget.render(cell);
                        }

                        // If the widget has a focusEl, ensure that its tabbability status is synched with the view's 
                        // navigable/actionable state. 
                        focusEl = widget.getFocusEl();
                        if (focusEl) {
                            if (view.actionableMode) {
                                if (!focusEl.isTabbable()) {
                                    focusEl.restoreTabbableState();
                                }
                            } else {
                                if (focusEl.isTabbable()) {
                                    focusEl.saveTabbableState();
                                }
                            }
                        }
                    }
                }
            }
        }//,
        //updateWidget: function (record) {
        //    var dataIndex = this.dataIndex,
        //        widget;

        //    if (this.rendered && this.bindDataIndex) {
        //        widget = this.getWidget(record);
        //        // Call the appropriate setter with this column's data field unless it's using binding 
        //        if (widget) {
        //            this.setWidgetVal(widget, record);
        //        }
        //    }
        //},
        //onItemAdd: function (records) {
        //    var me = this,
        //        view = me.getView(),
        //        hasAttach = !!me.onWidgetAttach,
        //        dataIndex = me.dataIndex,
        //        isFixedSize = me.isFixedSize,
        //        len = records.length, i,
        //        record,
        //        cell,
        //        widget,
        //        el,
        //        focusEl,
        //        width;

        //    // Loop through all records added, ensuring that our corresponding cell in each item 
        //    // has a Widget of the correct type in it, and is updated with the correct value from the record. 
        //    if (me.isVisible(true)) {
        //        for (i = 0; i < len; i++) {
        //            record = records[i];
        //            if (record.isNonData) {
        //                continue;
        //            }

        //            cell = view.getCell(record, me);

        //            // May be a placeholder with no data row 
        //            if (cell) {
        //                cell = cell.dom.firstChild;
        //                if (!isFixedSize && !width && me.lastBox) {
        //                    width = me.lastBox.width - parseInt(me.getCachedStyle(cell, 'padding-left'), 10) - parseInt(me.getCachedStyle(cell, 'padding-right'), 10);
        //                }

        //                widget = me.getWidget(record);
        //                widget.$widgetColumn = me;
        //                widget.$widgetRecord = record;

        //                // Render/move a widget into the new row 
        //                Ext.fly(cell).empty();

        //                //修改
        //                // Call the appropriate setter with this column's data field 
        //                this.setWidgetVal(widget, record);
        //                //if (widget.defaultBindProperty && dataIndex) {
        //                //    widget.setConfig(widget.defaultBindProperty, record.get(dataIndex));
        //                //}

        //                el = widget.el || widget.element;
        //                if (el) {
        //                    cell.appendChild(el.dom);
        //                    if (!isFixedSize) {
        //                        widget.setWidth(width);
        //                    }
        //                    widget.reattachToBody();
        //                } else {
        //                    if (!isFixedSize) {
        //                        // Must have a width so that the initial layout works 
        //                        widget.width = width || 100;
        //                    }
        //                    widget.render(cell);
        //                }

        //                // We have to run the callback *after* reattaching the Widget 
        //                // back to the document body. Otherwise widget's layout may fail 
        //                // because there are no dimensions to measure when the callback is fired! 
        //                if (hasAttach) {
        //                    Ext.callback(me.onWidgetAttach, me.scope, [me, widget, record], 0, me);
        //                }

        //                // If the widget has a focusEl, ensure that its tabbability status is synched 
        //                // with the view's navigable/actionable state. 
        //                focusEl = widget.getFocusEl();

        //                if (focusEl) {
        //                    if (view.actionableMode) {
        //                        if (!focusEl.isTabbable()) {
        //                            focusEl.restoreTabbableState();
        //                        }
        //                    }
        //                    else {
        //                        if (focusEl.isTabbable()) {
        //                            focusEl.saveTabbableState();
        //                        }
        //                    }
        //                }
        //            }
        //        }
        //    } else {
        //        view.refreshNeeded = true;
        //    }
        //}
    }
});
/* ***********************************************
 * author :  fei85
 * function: 
 * history:  created by fei85 2016/9/21 9:43:38 
 * ***********************************************/
Ext.define("Fm.override.grid.View", {
    override: "Ext.grid.View",
    //设置表格内容可复制
    enableTextSelection: true
});
/* ***********************************************
 * author :  苗建龙
 * function: 增加 异常提示  控制台
 * history:  created by 苗建龙 2015/7/3 10:04:05 
 * history:  update by 苗建龙 2015/8/18 10:04:05 
 * history:  update by 何泽立 2015/11/12 17:04:05 异常处理 
             Ext.Boot 增加版本缓存更新
 * ***********************************************/
(function () {
    //Ext.Boot 增加版本缓存更新参数
    Ext.apply(Ext.Boot, {
        create: function (url, key, cfg) {
            var config = cfg || {};
            try {
                url = Ext.urlAppend(url, "_v=" + AppConfig.version);
            } catch (e) { }
            config.url = url;
            config.key = key;
            return Ext.Boot.scripts[key] = new Ext.Boot.Entry(config);
        }
    });

    Ext.apply(Ext.Loader, {
        //增加 AppConfig.urlStartWith 前缀处理
        loadScript: function (options) {
            var Loader = Ext.Loader;
            var isString = typeof options === 'string',
                isArray = options instanceof Array,
                isObject = !isArray && !isString,
                url = isObject ? options.url : options,
                onError = isObject && options.onError,
                onLoad = isObject && options.onLoad,
                scope = isObject && options.scope,
                request = {
                    url: (AppConfig.urlStartWith + '/' + url).replace('///', '/').replace('//', '/'),
                    scope: scope,
                    onLoad: onLoad,
                    onError: onError,
                    _classNames: []
                };

            Loader.loadScripts(request);
        },
        //增加Ext.Loader异常提示  控制台
        onLoadFailure: function () {
            var Loader = Ext.Loader;
            var options = this,
                onError = options.onError;

            Loader.hasFileLoadError = true;
            --Loader.scriptsLoading;

            if (onError) {
                //TODO: need an adapter to convert to v4 onError signatures 
                onError.call(options.userScope, options);
            }
                //<debug> 
            else {
                Ext.Msg.alert('操作失败', '网络已断开,请检查您的网络并重试。');
                Ext.log.error("[Ext.Loader] Some requested files failed to load.");
                var _entries = arguments[0].entries;
                for (var i = 0; i < _entries.length; i++) {
                    if (_entries[i].error) {
                        //清除缓存 关闭重新点击时重新请求
                        Ext.Boot.scripts[_entries[i].key] = undefined;
                        Ext.log.error("[Ext.Loader]类: " + options._classNames[i] + " 加载失败,请检查requires或者uses配置路径。");
                        //Ext.log.error(_entries[i].error);
                    }
                }
            }
            //</debug> 

            Loader.checkReady();
        }
    });
    (function () {
        //增加Ext.create错误时的异常提示  控制台
        Ext.apply(Ext, {
            create: function () {
                try {
                    var name = arguments[0],
                        nameType = typeof name,
                        args = Array.prototype.slice.call(arguments, 1),
                        cls,
                        Manager = Ext.ClassManager,
                        isNonBrowser = typeof window === 'undefined';

                    if (nameType === 'function') {
                        cls = name;
                    } else {
                        if (nameType !== 'string' && args.length === 0) {
                            args = [name];
                            if (!(name = name.xclass)) {
                                name = args[0].xtype;
                                if (name) {
                                    name = 'widget.' + name;
                                }
                            }
                        }

                        //<debug> 
                        if (typeof name !== 'string' || name.length < 1) {
                            throw new Error("[Ext.create] Invalid class name or alias '" + name +
                                            "' specified, must be a non-empty string");
                        }
                        //</debug> 

                        name = Manager.resolveName(name);
                        cls = Manager.get(name);
                    }

                    // Still not existing at this point, try to load it via synchronous mode as the last resort 
                    if (!cls) {
                        //<debug> 
                        //<if nonBrowser> 
                        !isNonBrowser &&
                        //</if> 
                        Ext.log.warn("[Ext.Loader] Synchronously loading '" + name + "'; consider adding " +
                             "Ext.require('" + name + "') above Ext.onReady");
                        //</debug> 

                        Ext.syncRequire(name);

                        cls = Manager.get(name);
                    }

                    //<debug> 
                    if (!cls) {
                        throw new Error("[Ext.create] Unrecognized class name / alias: " + name);
                    }

                    if (typeof cls !== 'function') {
                        throw new Error("[Ext.create] Singleton '" + name + "' cannot be instantiated.");
                    }
                    //</debug> 

                    return Manager.getInstantiator(args.length)(cls, args);
                } catch (e) {
                    Ext.log.error("[Ext.create] 位于Class " + name + " .消息:" + e.message);
                    Ext.log.error(e.stack);
                    application.globalMask.hide();
                    return Ext.create('Ext.container.Container');
                }
            }
        });
    })();

    //Ext错误提示
    Ext.apply(Ext.Error, {
        raise: function (err) {
            err = err || {};
            if (Ext.isString(err)) {
                err = { msg: err };
            }

            var me = this,
                method = me.raise.caller,
                msg, name;

            if (method === Ext.raise) {
                method = method.caller;
            }
            if (method) {
                if (!err.sourceMethod && (name = method.$name)) {
                    err.sourceMethod = name;
                }
                if (!err.sourceClass && (name = method.$owner) && (name = name.$className)) {
                    err.sourceClass = name;
                }
            }

            if (me.handle(err) !== true) {
                msg = toString.call(err);

                //<debug> 
                Ext.log({
                    msg: msg,
                    level: 'error',
                    dump: err,
                    stack: true
                });
                //</debug> 

                if (AppConfig.isDev) {
                    try {
                        Fm.msg.error(msg);
                    } catch (e) {

                    }
                    throw new Ext.Error(err);
                }
            }
        }
    });

})();
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/7/3 10:03:11 
 * ***********************************************/
Ext.define("Fm.override.layout.component.Dock", {
    override: "Ext.layout.component.Dock",
    //去除form panel 等组件的默认边框
    handleItemBorders: function () {
        var me = this,
            owner = me.owner;
        if (owner.border !== true) {
            owner.border = false;
        }
        me.callParent(arguments);
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/7/3 10:03:11 
 * ***********************************************/
Ext.define("Fm.override.layout.container.Table", {
    override: "Ext.layout.container.Table",
    config: { columns: null },
    //修正table布局 hideMode === 'visibility' 不起作用的Bug
    getLayoutItems: function () {
        var me = this,
            owner = me.owner,
            result = [],
            allitems = owner && owner.items,
            items = (allitems && allitems.items) || [],
            item,
            len = items.length, i;

        for (i = 0; i < len; i++) {
            item = items[i];
            if (!item.hidden || item.hideMode === 'visibility') {
                result.push(item);
            }
        }
        return result;
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/12/11 13:24:04 
 * ***********************************************/
Ext.define("Fm.override.list.Tree", {
    override: "Ext.list.Tree",
    privates: {
        floatItem: function (item, byHover) {
            var me = this;

            me.callParent(arguments);

            //修正IE下不影藏浮动菜单的问题
            item.element.on('mouseout', me.checkForMouseLeave, me);
        }
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/12/11 13:24:04 
 * ***********************************************/
Ext.define("Fm.override.list.TreeItem", {
    override: "Ext.list.TreeItem",
    //Ext.list.Tree添加itemclick事件
    isSelectionEvent: function (e) {
        var me = this,
            owner = this.getOwner();

        owner.fireEvent('itemclick', owner, me.getNode());
        return false;
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/12/11 13:24:04 
 * ***********************************************/
Ext.define("Fm.override.panel.Panel", {
    override: "Ext.panel.Panel",
    border: false,
    frame: false,
    closeToolText: '关闭'
});
/* ***********************************************
 * author :  fei85
 * function: 
 * history:  created by fei85 2016/9/21 9:48:17 
 * ***********************************************/
Ext.define("Fm.override.panel.Table", {
    override: "Ext.panel.Table",
    //增加行的可用不可用设置
    setDisabled: function (records) {
        Ext.log.warn('此方法(grid:setDisabled)不建议继续使用，替代：setRowDisabled(records, isDis)');
        this.setRowDisabled(records, true);
    },
    //增加行的可用不可用设置
    setRowDisabled: function (records, isDis) {
        var me = this,
            view = me.getView(),
            isDis = isDis || true;
        Ext.suspendLayouts();
        Ext.Array.each(records, function (item) {
            item.set({ _isDisabled: isDis });
        });
        Ext.resumeLayouts(true);
    },
    //修改bind selection多选的问题
    updateBindSelection: function (selModel, selection) {
        var me = this,
            selected = null;
        if (!me.ignoreNextSelection) {
            me.ignoreNextSelection = true;
            if (selection.length) {
                if (selModel.selectionMode === 'SINGLE') {
                    selected = selModel.getLastSelected();
                } else {
                    selected = me.getSelection();
                }
                me.hasHadSelection = true;
            }
            if (me.hasHadSelection) {
                me.setSelection(selected);
            }
            me.ignoreNextSelection = false;
        }
    },
    getRowExpander: function () {
        if (this.plugins && Ext.isArray(this.plugins)) {
            for (var i = 0; i < this.plugins.length; i++) {
                if (this.plugins[i].isRowExpander) {
                    return this.plugins[i];
                }
            }
        } else {
            if (this.plugins && this.plugins.isRowExpander) {
                return this.plugins;
            }
        }
    },
    getClickSelectionModel: function () {
        if (this.plugins && Ext.isArray(this.plugins)) {
            for (var i = 0; i < this.plugins.length; i++) {
                if (this.plugins[i].isClickSelection) {
                    return this.plugins[i];
                }
            }
        } else {
            if (this.plugins && this.plugins.isClickSelection) {
                return this.plugins;
            }
        }
    },
    getExportColumns: function () {
        var me = this,
            columns = me.getColumns();

        var exportColumns = Ext.Array.filter(columns, function (column) {
            return !column.isCheckerHd && !column.ignoreExport;
        });

        return exportColumns;
    },
    exportAlign: {
        'left': 'Left',
        'right': 'Right',
        'center': 'Center'
    },
    //获取导出数据
    getExportData: function (records) {
        var me = this,
            exportColumns = me.getExportColumns(),
            lenCols = exportColumns.length,
            titles = [],
            rows = [],
            record, row, col, v,
            regExp = /<.*>(.*)<\/.*>|<.*\/>/;

        Ext.Array.each(exportColumns, function (column) {
            if (!column.isCheckerHd && !column.ignoreExport) {
                var width = column.exportWidth || column.width;
                try {
                    width = column.getWidth();
                } catch (e) { }
                titles.push({
                    TitleName: column.text,
                    TitleValue: column.exportIndex || column.dataIndex,
                    TitleWide: Math.ceil(width / 7.5),
                    IsRMB: !!column.exportIsRMB,
                    IsCount: !!column.exportIsCount,
                    DataType: column.dataType,
                    Digit: column.digit,
                    CellType: me.exportAlign[column.align]
                });
            }
        });

        if (records) {
            for (var i = 0; i < records.length; i++) {
                record = records[i];
                row = {};

                for (var j = 0; j < lenCols; j++) {
                    col = exportColumns[j];
                    v = record.get(col.dataIndex);
                    if (col.exportRender) {
                        v = col.exportRender(v, null, record);
                    } else if (col.renderer && !col.renderer.$emptyFn) {
                        v = col.renderer(v, null, record);
                    }
                    if (v === null || v === undefined) {
                        v = '';
                    }
                    v = v.toString();
                    if (v) {
                        //替换金额数字
                        _v = v.replace(/￥/g, '');
                        if (_v) {
                            v = _v;
                            //处理html标签
                            var _temp = v.match(regExp);
                            if (_temp) {
                                v = _temp[1];
                            }
                        }
                    }
                    row[col.exportIndex || col.dataIndex] = v.trim();
                }

                rows.push(row);
            }
        }

        return {
            titles: titles,
            rows: rows
        };
    }
});

/* ***********************************************
 * author :  苗建龙
 * function: panel 标题栏 增加双击事件
 * history:  created by 苗建龙 2015/12/11 13:26:21 
 * ***********************************************/
Ext.define("Fm.override.panel.Title", {
    override: "Ext.panel.Title",

    onRender: function () {
        var me = this,
            addOndblclick,
            btn,
            btnListeners;

        me.callParent(arguments);

        // Set btn as a local variable for easy access
        me.el.on({
            dblclick: me.ondblClick,
            scope: me
        });
    },
    doPreventDefault: function (e) {
        if (e && (this.preventDefault || (this.disabled && this.getHref()))) {
            e.preventDefault();
        }
    },
    ondblClick: function (e) {
        var me = this;
        me.doPreventDefault(e);
        // Click may have destroyed the button
        if (me.up('tabpanel')
            && me.up('tabpanel').fireEvent('tabbardblclick', me, e) !== false
            && !me.destroyed) {
            Ext.callback(me.handler, me.scope, [me, e], 0, me);
        }
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/12/11 13:25:49 
 * ***********************************************/
Ext.define("Fm.override.resizer.Splitter", {
    override: "Ext.resizer.Splitter",
    //分割条宽度
    size: 5,
    //最小高度
    defaultSplitMin: 0,
    //双击折叠
    collapseOnDblClick: false
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/8/14 14:45:30 
 * ***********************************************/
Ext.define("Fm.override.selection.CheckboxModel", {
    override: "Ext.selection.CheckboxModel",
    //解决取消全选卡死的bug
    onHeaderClick: function (headerCt, header, e) {
        var me = this,
            isChecked;

        if (header === me.column && me.mode !== 'SINGLE') {
            isChecked = header.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');

            if (isChecked) {
                me.deselectAll();
            } else {
                me.selectAll();
            }
            e.stopEvent();
        }
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 解决大量数据取消全选速度慢的问题 增加行disabled设置
 * history:  created by 苗建龙 2015/7/3 9:55:30 
 * ***********************************************/
Ext.define("Fm.override.selection.Model", {
    override: "Ext.selection.Model",
    bindCheckedField: null,
    addSelectItems: function () {
        var me = this,
            owner;
        //if (me.grid.mask) {
        //    me.grid.mask('......');
        //}
        Ext.suspendLayouts();
        me.suspendChanges();
        me.selected.clear();

        var temp = [];
        Ext.Array.each(me.store.getData().items, function (item) {
            if (item.get(me.bindCheckedField)) {
                //me.selected.add(item);
                temp.push(item)
            }
        });
        me.select(temp, true, true);
        me.fireEvent('updateGroupSelect');
        me.resumeChanges();
        Ext.resumeLayouts(true);
    },
    onStoreLoad: function () {
        var me = this,
            store = me.store;
        if (me.bindCheckedField && store != null && store.getData().items.length > 0) {
            Ext.log.warn('此方法(grid的selection插件配置自动选中行)不建议继续使用，替代：Fm.ux.grid.plugin.AutoSelector 插件模式');
            me.addSelectItems();
        }
    },
    doSelect: function (records, keepExisting, suppressEvent) {
        var me = this,
            record;

        if (me.locked || records == null) {
            return;
        }

        if (typeof records === "number") {
            record = me.store.getAt(records);
            // No matching record, jump out. 
            if (!record) {
                return;
            }
            records = [record];
        }

        if (me.selectionMode === "SINGLE") {
            if (records.isModel) {
                records = [records];
            }

            if (records.length) {
                //行disabled时过滤
                if (records[0].get('_isDisabled')) {
                    return;
                }
                me.doSingleSelect(records[0], suppressEvent);
            }
        } else {
            if (!Ext.isArray(records)) {
                records = [records];
            }
            //行disabled时过滤
            var selRecords = Ext.Array.filter(records, function (re) {
                return !re.get('_isDisabled')
            });
            me.doMultiSelect(selRecords, keepExisting, suppressEvent);
        }
    },

    doDeselect: function (records, suppressEvent) {
        var me = this;

        if (me.locked || !me.store) {
            return false;
        }

        if (typeof records === "number") {
            record = me.store.getAt(records);
            // No matching record, jump out 
            if (!record) {
                return false;
            }
            records = [record];
        } else if (!Ext.isArray(records)) {
            records = [records];
        }

        //行disabled时过滤
        records = Ext.Array.filter(records, function (re) {
            return !re.get('_isDisabled')
        });

        return me.callParent([records, suppressEvent]);
    },
    selectAll: function (suppressEvent) {
        var me = this,
            selections = me.store.getRange(),
            start = me.getSelection().length;

        this.callParent([true]);

        if (!me.destroyed) {
            // fire selection change only if the number of selections differs 
            if (!suppressEvent) {
                me.maybeFireSelectionChange(me.getSelection().length !== start);
            }
        }
        this.fireEvent('selectAll', this);
    },
    deselectAll: function (suppressEvent) {
        var me = this,
            selections = me.getSelection(),
            start = selections.length;

        this.callParent([true]);

        if (!me.destroyed) {
            // fire selection change only if the number of selections differs 
            if (!suppressEvent) {
                me.maybeFireSelectionChange(me.getSelection().length !== start);
            }
        }
        this.fireEvent('deselectAll', this);
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 增加双击事件
 * history:  created by 苗建龙 2015/12/11 13:26:21 
 * ***********************************************/
Ext.define("Fm.override.toolbar.Toolbar", {
    override: "Ext.toolbar.Toolbar",
    //统一按钮样式
    defaultButtonUI: 'default',

    dblclickEvent: 'dblclick',
    onRender: function () {
        var me = this,
            addOndblclick,
            btn,
            btnListeners;

        me.callParent(arguments);

        // Set btn as a local variable for easy access
        me.el.on({
            dblclick: me.ondblClick,
            scope: me
        });
    },
    doPreventDefault: function (e) {
        if (e && (this.preventDefault || (this.disabled && this.getHref()))) {
            e.preventDefault();
        }
    },
    ondblClick: function (e) {
        var me = this;
        me.doPreventDefault(e);
        // Click may have destroyed the button
        if (me.fireEvent('dblclick', me, e) !== false && !me.destroyed) {
            Ext.callback(me.handler, me.scope, [me, e], 0, me);
        }
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/12/11 13:25:01 
 * ***********************************************/
Ext.define("Fm.override.tree.Column", {
    override: "Ext.tree.Column",
    //去除树前面的默认图标
    cellTpl: [
    '<tpl for="lines">',
        '<div class="{parent.childCls} {parent.elbowCls}-img ',
        '{parent.elbowCls}-<tpl if=".">line<tpl else>empty</tpl>" role="presentation"></div>',
    '</tpl>',
    '<div class="{childCls} {elbowCls}-img {elbowCls}',
        '<tpl if="isLast">-end</tpl><tpl if="expandable">-plus {expanderCls}</tpl>" role="presentation"></div>',
    '<tpl if="checked !== null">',
        '<div role="button" {ariaCellCheckboxAttr}',
            ' class="{childCls} {checkboxCls}<tpl if="checked"> {checkboxCls}-checked</tpl>"></div>',
    '</tpl>',
    //'<tpl if="icon"><img src="{blankUrl}"<tpl else><div</tpl>',
    //    ' role="presentation" class="{childCls} {baseIconCls} {customIconCls} ',
    //    '{baseIconCls}-<tpl if="leaf">leaf<tpl else><tpl if="expanded">parent-expanded<tpl else>parent</tpl></tpl> {iconCls}" ',
    //    '<tpl if="icon">style="background-image:url({icon})"/><tpl else>></div></tpl>',
    '<tpl if="href">',
        '<a href="{href}" role="link" target="{hrefTarget}" class="{textCls} {childCls}">{value}</a>',
    '<tpl else>',
        '<span class="{textCls} {childCls}">{value}</span>',
    '</tpl>'
    ]
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/12/18 14:35:10 
 * ***********************************************/
Ext.define("Fm.override.util.Sorter", {
    override: "Ext.util.Sorter",
    sortFn: function (item1, item2) {
        var me = this,
            transform = me._transform,
            root = me._root,
            property = me._property,
            lhs, rhs;

        if (root) {
            item1 = item1[root];
            item2 = item2[root];
        }

        lhs = item1[property];
        rhs = item2[property];

        if (transform) {
            lhs = transform(lhs);
            rhs = transform(rhs);
        }
        //start 解决 中文排序不对的 bug
        if (typeof (lhs) === "string") {
            return lhs.localeCompare(rhs);
        }
        //end
        return (lhs > rhs) ? 1 : (lhs < rhs ? -1 : 0);
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/12/11 13:21:31 
 * ***********************************************/
Ext.define("Fm.override.view.AbstractView", {
    override: "Ext.view.AbstractView",
    //loading图标
    loadingText: (function () {
        if (window.AppConfig) {
            return window.AppConfig.maskHtml;
        }
        return '加载中...'
    })()
});
/* ***********************************************
 * author :  fei85
 * function: 
 * history:  created by fei85 2016/9/21 9:44:15 
 * ***********************************************/
Ext.define("Fm.override.view.Table", {
    override: "Ext.view.Table",
    //设置表格内容可复制
    enableTextSelection: true,
    disableCls: 'x-form-item-default x-item-disabled',
    //增加disabled样式
    rowTpl: [
        '{%',
        'var dataRowCls = values.recordIndex === -1 ? "" : " ' + Ext.baseCSSPrefix + 'grid-row";',
        'var disabledCls = values.record.get("_isDisabled") ? "x-form-item-default x-item-disabled":"";',
        '%}',
        '<tr class="{[values.rowClasses.join(" ")]} {[disabledCls]} {[dataRowCls]}"',
        ' role="{rowRole}" {rowAttr:attributes}>',
        '<tpl for="columns">' +
        '{%',
        'parent.view.renderCell(values, parent.record, parent.recordIndex, parent.rowIndex, xindex - 1, out, parent)',
        '%}',
        '</tpl>',
        '</tr>',
        {
            priority: 0
        }
    ],
    initComponent: function () {
        var me = this;

        //增加单元格单击复制功能
        if (AppConfig.enableGridClickCopy && me.grid && !me.grid.notEnabledCopy) {
            if (window.clipboardData) {
                me.on('cellclick', function (view, item) {
                    if (window.clipboardData) {
                        window.clipboardData.setData("Text", Ext.String.trim(item.innerText || item.textContent || ''));
                    }
                });
            } else if (window.Clipboard) {
                var ver = parseInt(Ext.versions.extjs.major.toString() + Ext.versions.extjs.minor.toString() + Ext.versions.extjs.pad.toString(), 10);
                var _obj = ver < 620 ? {
                    text: function (item) {
                        return Ext.String.trim(item.innerText || item.textContent || '');
                    }
                } : {
                        target: function (item) {
                            return item;
                        }
                    };

                me.on('refresh', function (view) {
                    setTimeout(function () {
                        var el = me.getEl();
                        if (el && el.dom && el.dom.querySelectorAll) {
                            var clipboard = new Clipboard(el.dom.querySelectorAll('.x-grid-cell-inner'), _obj);
                        }
                    }, 300);
                });
                var fn = function (records, index, nodes, eOpts) {
                    for (var i = 0; i < nodes.length; i++) {
                        var clipboard = new Clipboard(nodes[i].querySelectorAll('.x-grid-cell-inner'), _obj);
                    }
                }
                me.on('itemadd', fn);
                me.on('itemupdate', fn);
            }
        }
        me.callParent(arguments);
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2016/1/4 11:05:17 
 * ***********************************************/
Ext.define("Fm.override.window.MessageBox", {
    override: "Ext.window.MessageBox",
    //调整弹出框的大小
    prompt: function (title, message, fn, scope, multiline, value) {
        if (Ext.isString(title)) {
            title = {
                prompt: true,
                title: title,
                minWidth: this.minPromptWidth,
                message: message,
                buttons: this.OKCANCEL,
                callback: fn,
                scope: scope,
                multiline: multiline,
                value: value,
                width: 360,
                height: 180
            };
        }
        return this.show(title);
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: BitLength验证 中文占两个字节
 * history:  created by 苗建龙 2015/7/3 10:04:59 
 * ***********************************************/
Ext.define('Fm.data.validator.ByteLength', {
    extend: 'Ext.data.validator.Bound',
    alias: 'data.validator.bytelength',

    type: 'bytelength',

    config: {
        maxOnlyMessage: '长度不能超过 {0}个字符(一个汉字算两个字符)'
    },

    getValue: function (v) {
        var _temp = String(v);
        return _temp.length + (_temp.match(/[^x00-xff]/g) || []).length;
    }
});
/* ***********************************************
 * author :  fei85
 * function: 本地化补充
 * history:  created by fei85 2017/5/2 14:08:22 
 * ***********************************************/
Ext.define("Fm.locale.zh_CN.grid.feature.Grouping", {
    override: "Ext.grid.feature.Grouping",
    //<locale>
    expandTip: '',
    //</locale>
    //<locale>
    collapseTip: ''
    //</locale>
});

Ext.define("Fm.locale.zh_CN.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "读取中..."
});

Ext.define("Fm.locale.zh_CN.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox"
}, function () {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "读取中..."
    });
});


Ext.define("Fm.locale.zh_CN.data.validator.Email", {
    override: "Ext.data.validator.Email",
    config: {
        message: '该输入项必须是电子邮件地址，格式如： "user@example.com"'
    }
});


Ext.define("Fm.locale.zh_CN.data.validator.Length", {
    override: "Ext.data.validator.Length",
    config: {
        minOnlyMessage: '长度必须大于 {0}',
        maxOnlyMessage: '长度不能超过 {0}',
        bothMessage: '长度必须为 {0}到{1}'
    }
});

Ext.define("Fm.locale.zh_CN.panel.Panel", {
    override: "Ext.panel.Panel",
    closeToolText: '关闭'
});
/* ***********************************************
 * author :  苗建龙
 * function: ImageButton
 * history:  created by 苗建龙 2015/6/9 15:12:18 
 * ***********************************************/
Ext.define("Fm.ux.button.ImageButton", {
    extend: "Ext.button.Button",
    alias: "widget.imagebutton",
    cls: "",
    iconAlign: "left",
    initRenderTpl: Ext.emptyFn,
    componentLayout: null,
    autoEl: 'img',
    frame: false,
    initComponent: function () {
        this.scale = null;
        this.callParent();
        this.autoEl = {
            tag: 'img',
            role: 'button',
            hidefocus: 'on',
            unselectable: 'on'
        };
        var i;
        if (this.imageUrl) {
            i = new Image().src = this.imageUrl;
        }
        if (this.overImageUrl) {
            i = new Image().src = this.overImageUrl;
        }
        if (this.disabledImageUrl) {
            i = new Image().src = this.disabledImageUrl;
        }
        if (this.pressedImageUrl) {
            i = new Image().src = this.pressedImageUrl;
        }
    },
    getElConfig: function () {
        return Ext.apply(this.callParent(), {
            tag: "img",
            id: this.getId(),
            src: this.imageUrl,
            style: this.getStyle()
        });
    },
    getStyle: function () {
        var style = "border:none;cursor:pointer;";
        if (this.style) {
            style += this.style;
        }
        if (this.height) {
            style += "height:" + this.height + "px;";
        }
        if (this.width) {
            style += "width:" + this.width + "px;";
        }
        return style;
    },
    onRender: function (ct, position) {
        this.imgEl = this.el;
        if (!Ext.isEmpty(this.imgEl.getAttribute("width"), false) || !Ext.isEmpty(this.imgEl.getAttribute("height"), false)) {
            this.imgEl.dom.removeAttribute("width");
            this.imgEl.dom.removeAttribute("height");
        }
        if (this.altText) {
            this.imgEl.dom.setAttribute("alt", this.altText);
        }
        if (this.align && this.align !== "notset") {
            this.imgEl.dom.setAttribute("align", this.align);
        }
        if (this.pressed && this.pressedImageUrl) {
            this.imgEl.dom.src = this.pressedImageUrl;
        }
        if (this.disabled) {
            this.setDisabled(true);
        }
        if (this.tabIndex !== undefined) {
            this.imgEl.dom.tabIndex = this.tabIndex;
        }
        if (this.href) {
            this.on("click",
            function () {
                if (this.target) {
                    window.open(this.href, this.target);
                } else {
                    window.location = this.href;
                }
            },
            this);
        }
        this.callParent(arguments);
        this.btnEl = this.el;
    },
    onMenuShow: function (e) {
        this.ignoreNextClick = 0;
        if (this.pressedImageUrl) {
            this.imgEl.dom.src = this.pressedImageUrl;
        }
        this.fireEvent("menushow", this, this.menu);
    },
    onMenuHide: function (e) {
        this.ignoreNextClick = Ext.defer(this.restoreClick, 250, this);
        this.imgEl.dom.src = (this.monitoringMouseOver) ? this.overImageUrl : this.imageUrl;
        this.fireEvent("menuhide", this, this.menu);
        this.focus();
    },
    getTriggerSize: function () {
        return 0;
    },
    toggle: function (state, suppressEvent, suppressHandler) {
        state = state === undefined ? !this.pressed : !!state;
        if (state != this.pressed) {
            if (state) {
                if (this.pressedImageUrl) {
                    this.imgEl.dom.src = this.pressedImageUrl;
                }
                this.pressed = true;
            } else {
                this.imgEl.dom.src = (this.monitoringMouseOver) ? this.overImageUrl : this.imageUrl;
                this.pressed = false;
            }
            if (!suppressEvent) {
                this.fireEvent("toggle", this, this.pressed);
            }
            if (this.toggleHandler && !suppressHandler) {
                this.toggleHandler.call(this.scope || this, this, state);
            }
        }
        return this;
    },
    setText: Ext.emptyFn,
    setDisabled: function (disabled) {
        this.disabled = disabled;
        if (this.imgEl && this.imgEl.dom) {
            this.imgEl.dom.disabled = disabled;
        }
        if (disabled) {
            if (this.disabledImageUrl) {
                this.imgEl.dom.src = this.disabledImageUrl;
            } else {
                this.imgEl.addCls(this.disabledCls);
            }
            this.imgEl.setStyle({
                cursor: "default"
            });
        } else {
            this.imgEl.dom.src = this.imageUrl;
            this.imgEl.setStyle({
                cursor: "pointer"
            });
            this.imgEl.removeCls(this.disabledCls);
        }
    },
    onMouseOver: function (e) {
        if (!this.disabled) {
            var internal = e.within(this.el.dom, true);
            if (!internal) {
                if (this.overImageUrl && !this.pressed && !this.hasVisibleMenu()) {
                    this.imgEl.dom.src = this.overImageUrl;
                }
                if (!this.monitoringMouseOver) {
                    Ext.getDoc().on("mouseover", this.monitorMouseOver, this);
                    this.monitoringMouseOver = true;
                }
            }
        }
        this.fireEvent("mouseover", this, e);
    },
    monitorMouseOver: function (e) {
        if (e.target != this.el.dom && !e.within(this.el)) {
            if (this.monitoringMouseOver) {
                Ext.getDoc().un('mouseover', this.monitorMouseOver, this);
                this.monitoringMouseOver = false;
            }
            this.onMouseOut(e);
        }
    },
    onMouseEnter: function (e) {
        if (this.overImageUrl && !this.pressed && !this.disabled && !this.hasVisibleMenu()) {
            this.imgEl.dom.src = this.overImageUrl;
        }
        this.fireEvent("mouseover", this, e);
    },
    onMouseOut: function (e) {
        if (!this.disabled && !this.pressed && !this.hasVisibleMenu()) {
            this.imgEl.dom.src = this.imageUrl;
        }
        this.fireEvent("mouseout", this, e);
    },
    onMouseDown: function (e) {
        var me = this;
        if (Ext.isIE) {
            me.getFocusEl().focus();
        }
        if (!me.disabled && e.button === 0) {
            if (me.pressedImageUrl) {
                me.imgEl.dom.src = me.pressedImageUrl;
            }
            Ext.button.Manager.onButtonMousedown(me, e);
        }
    },
    onMouseUp: function (e) {
        if (!this.isDestroyed && e.button === 0 && !this.enableToggle && !this.hasVisibleMenu()) {
            this.imgEl.dom.src = (this.overImageUrl && this.monitoringMouseOver) ? this.overImageUrl : this.imageUrl;
        }
    },
    setImageUrl: function (image) {
        this.imageUrl = image;
        if ((!this.disabled || Ext.isEmpty(this.disabledImageUrl, false)) && (!this.pressed || Ext.isEmpty(this.pressedImageUrl, false))) {
            this.imgEl.dom.src = image;
        } else {
            new Image().src = image;
        }
    },
    setDisabledImageUrl: function (image) {
        this.disabledImageUrl = image;
        if (this.disabled) {
            this.imgEl.dom.src = image;
        } else {
            new Image().src = image;
        }
    },
    setOverImageUrl: function (image) {
        this.overImageUrl = image;
        if ((!this.disabled || Ext.isEmpty(this.disabledImageUrl, false)) && (!this.pressed || Ext.isEmpty(this.pressedImageUrl, false))) {
            this.imgEl.dom.src = image;
        } else {
            new Image().src = image;
        }
    },
    setPressedImageUrl: function (image) {
        this.pressedImageUrl = image;
        if ((!this.disabled || Ext.isEmpty(this.disabledImageUrl, false)) && this.pressed) {
            this.imgEl.dom.src = image;
        } else {
            new Image().src = image;
        }
    },
    setAlign: function (align) {
        this.align = align;
        if (this.rendered) {
            this.imgEl.dom.setAttribute("align", this.align);
        }
    },
    setAltText: function (altText) {
        this.altText = altText;
        if (this.rendered) {
            this.imgEl.dom.setAttribute("altText", this.altText);
        }
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: LinkButton
 * history:  created by 苗建龙 2015/6/9 15:12:18 
 * ***********************************************/
Ext.define("Fm.ux.button.LinkButton", {
    extend: "Ext.button.Button",
    alias: "widget.linkbutton",
    ui: 'button-link',
    initComponent: function () {
        this.callParent();
    }
});
/* ***********************************************
 * author :  wskicfuu
 * function: 选择输入框
 * history:  created by wskicfuu 2016/5/4 13:18:44 
 * ***********************************************/

Ext.define('Fm.ux.form.CheckField', {
    extend: 'Ext.container.Container',
    alias: 'widget.checkfield',
    alternateClassName: ['Fm.ux.CheckField'],
    items: [],
    viewModel: {
        data: {
            Checked: false
        }
    },
    layout: {
        type: 'hbox',
        align: 'right'
    },
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            items: [{
                xtype: 'checkbox',
                labelAlign: 'right',
                fieldLabel: me.fieldLabel,
                colspan: 1,
                width: 205,
                labelWidth: 180,
                bind: {
                    value: '{Checked}'
                }
            }, {
                xtype: 'textfield',
                margin: '0 60 0 0',
                colspan: 1,
                width: 150,
                value: me.value,
                bind: {
                    disabled: '{!Checked}'
                }
            }]
        })
        me.callParent();
    }
})
/* ***********************************************
 * author :  苗建龙
 * function: 下拉表格 带选择框 弹出框 全选按钮 多选
 * history:  created by 苗建龙 2015/6/9 15:12:18 
 * ***********************************************/
Ext.define('Fm.ux.form.ComboGrid', {
    extend: 'Ext.form.field.ComboBox',
    alias: ['widget.comboxgrid', 'widget.combogrid'],
    editable: false,
    windowTitle: null, //控制弹出窗的title
    winHeight: 500,
    winWidth: 800,
    //triggerCls: null,

    /**
     * 是否显示清除按钮
     */
    showClearTriggers: true,
    checkChangeEvents: Ext.isIE && (!document.documentMode || document.documentMode <= 9) ?
                        ['change', 'propertychange', 'keyup'] :
                        ['change', 'keyup', 'dragdrop'],
    /**
     * 是否在全选时处理值  为true时 全选的值用 multiAllValue 替代 仅限多选
     */
    isHandleAllValue: true,
    isValidate: false,
    taskType: null,
    month: null,
    /**
     * isHandleAllValue为true时 全选时的替代值
     */
    multiAllValue: [],
    /**
     * singleIsArray为true时 单选值也转换为数组
     */
    singleIsArray: false,
    isSelectAll: false,
    /**
     * 全部源数据的长度（包括无权限数据）
     * 用于判断是否替换全选值 如果有则使用‘allLength’比较，如果没有则使用store.totalCount比较
     */
    allLength: null,

    /**
    * 是否以弹出窗体显示
    */
    isPopWindow: false,

    //是否单选
    multiSelect: false,

    valueSplitChar: ',',

    valueIsString: false,

    initComponent: function () {
        var me = this;

        Ext.log.warn('Fm.ux.form.ComboGrid 不建议继续使用，替代：Fm.ux.form.ComboGridField(下拉)、Fm.ux.form.WindowField(弹出)');

        me.callParent(arguments);
    },
    onTriggerClick: function (e) {
        var me = this;

        if (me.isPopWindow) {
            me.onTriggerClickPopWindow()
        }
        else {
            if (!me.readOnly && !me.disabled) {
                if (me.isExpanded) {
                    me.collapse();
                } else {
                    me.expand();
                }
            }
        }
    },
    onFieldMutation: function (e) {
        var me = this,
            key = e.getKey(),
            isDelete = key === e.BACKSPACE || key === e.DELETE,
            isCtrl = key === e.CTRL,
            rawValue = me.inputEl.dom.value,
            len = rawValue.length;

        // Do not process two events for the same mutation.
        // For example an input event followed by the keyup that caused it.
        // We must process delete keyups.
        // Also, do not process TAB event which fires on arrival.
        if (!me.readOnly && (rawValue !== me.lastMutatedValue || isDelete) && key !== e.TAB) {
            var oldValue = me.lastMutatedValue;
            me.lastMutatedValue = rawValue;
            me.lastKey = key;
            if (!len && (e.type !== 'keyup' || (!e.isSpecialKey() || isDelete))) {
                me.clearValue();
                me.fireEvent('change', me);
            } else if (len && (e.type !== 'keyup' || (!e.isSpecialKey() || isDelete || isCtrl))) {
                //me.doQueryTask.delay(me.queryDelay);
                me.setValue(rawValue);
                me.fireEvent('change', me);
                //me.fireEvent('select', me, me, rawValue, oldValue);
            } else {
                // We have *erased* back to empty if key is a delete, or it is a non-key event (cut/copy)
                if (!len && (!key || isDelete)) {
                    // Essentially a silent setValue.
                    // Clear our value, and the tplData used to construct a mathing raw value.
                    if (!me.multiSelect) {
                        me.value = null;
                        me.displayTplData = undefined;
                    }
                    // If the value is blank we can't have a value
                    if (me.clearValueOnEmpty) {
                        me.valueCollection.removeAll();
                    }

                    // Just erased back to empty. Hide the dropdown.
                    me.collapse();

                    // There may have been a local filter if we were querying locally.
                    // Clear the query filter and suppress the consequences (we do not want a list refresh).
                    if (me.queryFilter) {
                        // Must set changingFilters flag for this.checkValueOnChange.
                        // the suppressEvents flag does not affect the filterchange event
                        me.changingFilters = true;
                        me.store.removeFilter(me.queryFilter, true);
                        me.changingFilters = false;
                    }
                }
                me.callParent([e]);
            }
        }
    },
    onTriggerClickPopWindow: function () {
        var me = this,
            win,
            selModel,
            bbar = ['->'];

        if (me.multiSelect) {
            selModel = {
                selType: "checkboxmodel",
                mode: "SIMPLE",
                allowDeselect: true
            };
            //bbar.push(
            //    {
            //    text: '全选',
            //    width: 70,
            //    handler: function (btn) {
            //        var win = btn.up('window[popWindow=is]'),
            //            grid = win.down('cisgrid') || win.down('grid'),
            //            records = grid.getSelection()

            //        grid.getSelectionModel().selectAll(true);
            //    }
            //}, {
            //    text: '取消选中',
            //    width: 70,
            //    handler: function (btn) {
            //        var win = btn.up('window[popWindow=is]'),
            //            grid = win.down('cisgrid') || win.down('grid'),
            //            records = grid.getSelection()

            //        grid.getSelectionModel().deselectAll(true);
            //    }
            //});
        } else {
            selModel = {
                mode: "SINGLE",
                allowDeselect: true
            };
        }
        bbar.push({
            text: '选择',
            width: 70,
            handler: function (btn) {
                var win = btn.up('window[popWindow=is]'),
                    grid = win.down('cisgrid') || win.down('grid'),
                    records = grid.getSelection();
                if (me.isValidate) {
                    me.setValue(null);
                }
                me.updateValue(records);
                if (me.callbackChecked) {
                    me.callbackChecked(records);
                }
                win.close();
            }
        }, {
            text: '取消',
            width: 70,
            handler: function (btn) {
                var win = btn.up('window[popWindow=is]');
                win.close();
            }
        });

        win = Ext.create('Ext.window.Window', {
            title: me.windowTitle || me.fieldLabel,
            height: me.winHeight,
            width: me.winWidth,
            modal: true,
            layout: 'fit',
            popWindow: 'is',
            taskType: me.taskType,
            month: me.month,
            listeners: {
                'close': function () {
                    me.focus();
                }
            },
            items: [Ext.apply(me.innerGrid, {
                selModel: selModel,
                listeners: {
                    'itemdblclick': function (obj, record, item, index, e, eOpts) {
                        if (!me.multiSelect) {
                            var array = [],
                                win = obj.up('window[popWindow=is]');
                            array.push(record);
                            if (me.isValidate) {
                                me.setValue(null);
                            }

                            me.updateValue(array);
                            if (me.callbackChecked) {
                                me.callbackChecked(record);
                            }
                            win.close();
                        }
                    },
                    afterrender: function (obj, record) {
                        //第一次焦点加载
                        if (obj.down('[focusEnable=true]')) {
                            obj.down('[focusEnable=true]').focus();
                        }

                    }
                }
            })],
            buttons: bbar
        });
        win.show();
    },
    getAllLength: function () {
        var me = this,
            store;

        if (!me.allLength) {
            store = me.getStore();
            if (!store || store.isEmptyStore) {
                var bind = me.getBind();
                if (bind && bind.store) {
                    store = bind.store.getValue();
                }
            }

            return store.getTotalCount();
        }

        return me.allLength;
    },

    createPicker: function () {
        var me = this,
            picker;

        picker = me.picker = me.getGridPicker();

        if (!me.store || me.store.isEmptyStore) {
            me.store = picker.getStore();
        }

        if (!me.store || me.store.isEmptyStore) {
            me.store = picker.getController().getGridStore();
        }

        if (me.pageSize) {
            picker.pagingToolbar.on('beforechange', me.onPageChange, me);
        }

        // We limit the height of the picker to fit in the space above
        // or below this field unless the picker has its own ideas about that.
        if (!picker.initialConfig.maxHeight) {
            picker.on({
                beforeshow: me.onBeforePickerShow,
                scope: me
            });
        }
        picker.getSelectionModel().on({
            beforeselect: me.onBeforeSelect,
            beforedeselect: me.onBeforeDeselect,
            scope: me
        });

        picker.getNavigationModel().navigateOnSpace = false;

        return picker;
    },

    getGridPicker: function () {
        var me = this;
        var temp = {
            pickerField: me,
            hidden: true,
            //store: me.getPickerStore(),
            displayField: me.displayField,
            preserveScrollOnRefresh: true,
            pageSize: me.pageSize,
            selModel: me.pickerSelectionModel,
            floating: true,
            minWidth: me.minPickerWidth,
            minHeight: me.minPickerHeight,
            maxHeight: me.maxPickerHeight,
            autoScroll: true,
            listeners: {
                itemclick: {
                    fn: me.onItemClick
                }
            },
            refresh: function () { }
        };

        if (me.store || me.store.isEmptyStore) {
            temp.store = me.getPickerStore();
        }

        var pickerConfig = Ext.apply(me.innerGrid, temp);

        //解决火狐下点击选择框关闭的问题
        me.originalCollapse = me.collapse;
        if (me.multiSelect) {
            pickerConfig.listeners.show = {
                fn: function () {
                    me.picker.el.on({
                        mouseover: function () {
                            this.collapse = Ext.emptyFn;
                        },
                        mouseout: function () {
                            this.collapse = this.originalCollapse;
                        },
                        scope: me
                    });
                }
            }
        } else {
            pickerConfig.listeners.show = {
                fn: function () {
                    me.picker.el.on({
                        mousedown: function () {
                            this.collapse = Ext.emptyFn;
                        },
                        mouseup: function () {
                            this.collapse = this.originalCollapse;
                        },
                        scope: me
                    });
                }
            }
        }

        var picker;

        picker = Ext.ComponentManager.create(Ext.isFunction(pickerConfig) ? pickerConfig.call() : pickerConfig, "panel");

        return picker;
    },
    updateValue: function (records) {
        var me = this,
            selectedRecords = records || me.valueCollection.getRange(),
            len = selectedRecords.length,
            valueArray = [],
            displayTplData = me.displayTplData || (me.displayTplData = []),
            inputEl = me.inputEl,
            i, record;

        // Loop through values, matching each from the Store, and collecting matched records
        displayTplData.length = 0;
        for (i = 0; i < len; i++) {
            record = selectedRecords[i];
            displayTplData.push(me.getRecordDisplayData(record));

            // There might be the bogus "value not found" record if forceSelect was set. Do not include this in the value.
            if (record !== me.valueNotFoundRecord) {
                valueArray.push(record.get(me.valueField));
            }
        }

        // Set the value of this field. If we are multiselecting, then that is an array.
        me.setHiddenValue(valueArray);
        me.value = me.multiSelect ? valueArray : valueArray[0];
        if (!Ext.isDefined(me.value)) {
            me.value = undefined;
        }
        me.displayTplData = displayTplData; //store for getDisplayValue method

        if (inputEl && me.emptyText && !Ext.isEmpty(me.value)) {
            inputEl.removeCls(me.emptyCls);
        }

        // Calculate raw value from the collection of Model data

        me.setRawValue(me.getDisplayValue());
        me.checkChange();

        me.refreshEmptyText();
        if (inputEl && me.typeAhead && me.hasFocus) {
            // if typeahead is configured, deselect any partials 
            me.selectText(displayValue.length);
        }
    },

    updateValue22: function (records) {
        var me = this,
            selectedRecords = me.valueCollection.getRange(),
            len = selectedRecords.length,
            valueArray = [],
            displayTplData = me.displayTplData || (me.displayTplData = []),
            inputEl = me.inputEl,
            i, record;

        if (selectedRecords.length == 0 && records) {
            selectedRecords = records;
            len = selectedRecords.length;
        }
        // Loop through values, matching each from the Store, and collecting matched records
        displayTplData.length = 0;
        for (i = 0; i < len; i++) {
            record = selectedRecords[i];
            displayTplData.push(me.getRecordDisplayData(record));

            // There might be the bogus "value not found" record if forceSelect was set. Do not include this in the value.
            if (record !== me.valueNotFoundRecord) {
                valueArray.push(record.get(me.valueField));
            }
        }



        //Ext.each(selectedRecords, function (sel) {
        //    valueArray.push(sel.get(me.valueField));
        //});

        // Set the value of this field. If we are multiselecting, then that is an array.
        me.setHiddenValue(valueArray);
        me.value = me.multiSelect ? valueArray : valueArray[0];
        if (!Ext.isDefined(me.value)) {
            me.value = undefined;
        }
        me.displayTplData = displayTplData; //store for getDisplayValue method

        if (inputEl && me.emptyText && !Ext.isEmpty(me.value)) {
            inputEl.removeCls(me.emptyCls);
        }

        // Calculate raw value from the collection of Model data
        me.setRawValue(me.getDisplayValue());
        me.checkChange();

        me.applyEmptyText();
    },

    doSetValue: function (value, add) {
        if (!this.isPopWindow) {
            this.getPicker();
        }
        var me = this,
            store = me.getStore(),
            Model,
            matchedRecords = [],
            valueArray = [],
            autoLoadOnValue = me.autoLoadOnValue,
            isLoaded = store.getCount() > 0 || store.isLoaded(),
            pendingLoad = store.hasPendingLoad(),
            unloaded = autoLoadOnValue && !isLoaded && !pendingLoad,
            forceSelection = me.forceSelection,
            selModel = me.pickerSelectionModel,
            displayIsValue = me.displayField === me.valueField,
            isEmptyStore = store.isEmptyStore,
            lastSelection = me.lastSelection,
            i, len, record, dataObj, valueChanged, key;
        if (add && !me.multiSelect) {
            Ext.raise('Cannot add values to non multiSelect ComboBox');
        }
        // Called while the Store is loading or we don't have the real store bound yet.
        // Ensure it is processed by the onLoad/bindStore.
        // Even if displayField === valueField, we still MUST kick off a load because even though
        // the value may be correct as the raw value, we must still load the store, and
        // upon load, match the value and select a record sop we can publish the *selection* to
        // a ViewModel.
        if (pendingLoad || unloaded || !isLoaded || isEmptyStore) {
            // If they are setting the value to a record instance, we can
            // just add it to the valueCollection and continue with the setValue.
            // We MUST do this before kicking off the load in case the load is synchronous;
            // this.value must be available to the onLoad handler.
            if (!value.isModel) {
                if (me.multiSelect && !me.valueIsString) {
                    var _tempV = value;
                    if (value && !Ext.isArray(value)) {
                        _tempV = value.toString().split(me.valueSplitChar);
                    }
                    value = _tempV;
                }
                if (add) {
                    me.value = Ext.Array.from(me.value).concat(value);
                } else {
                    me.value = value;
                }
                //判断 object 表示 赋值的话 是空  value 是字符串 
                //输入文本 value是数组 this.displayTplData 是空数组
                if (value === '') {
                    this.displayTplData = [''];
                }
                if (this.displayTplData && (this.displayTplData.length === 0 || typeof this.displayTplData[0] === 'string') && typeof this.displayTplData[0] !== 'object') {
                    var tempvalue = [];
                    tempvalue.push(value);
                    this.displayTplData = tempvalue;
                }
                me.setHiddenValue(me.value);
                if (this.displayTplData && this.displayTplData.length !== 0 && typeof value !== 'object') {
                    me.setRawValue(me.getDisplayValue());
                } else {
                    me.setRawValue(me.value);
                }

                //me.setRawValue(me.value);

                if (me.value) {
                    this.displayTplData = [];
                    me.inputEl.removeCls(me.emptyCls + '-' + me.ui);
                }
                if (!value.isModel || isEmptyStore) {
                    return me;
                }
                // If we know that the display value is the same as the value, then show it.
                // A store load is still scheduled so that the matching record can be published.
            }
            // Kick off a load. Doesn't matter whether proxy is remote - it needs loading
            // so we can select the correct record for the value.
            //
            // Must do this *after* setting the value above in case the store loads synchronously
            // and fires the load event, and therefore calls onLoad inline.
            //
            // If it is still the default empty store, then the real store must be arriving
            // in a tick through binding. bindStore will call setValueOnData.
            if (unloaded && !isEmptyStore) {
                store.load();
            }
            // If they had set a string value, another setValue call is scheduled in the onLoad handler.
            // If the store is the defauilt empty one, the setValueOnData call will be made in bindStore
            // when the real store arrives.
            if (!value.isModel || isEmptyStore) {
                return me;
            }
        }
        // This method processes multi-values, so ensure value is an array.
        value = add ? Ext.Array.from(me.value).concat(value) : Ext.Array.from(value);
        // Loop through values, matching each from the Store, and collecting matched records
        for (i = 0, len = value.length; i < len; i++) {
            record = value[i];
            // Set value was a key, look up in the store by that key
            if (!record || !record.isModel) {
                //record = me.findRecordByValue(key = record);
                record = me.store.findRecord(me.valueField, record);
                // The value might be in a new record created from an unknown value (if !me.forceSelection).
                // Or it could be a picked record which is filtered out of the main store.
                // Or it could be a setValue(record) passed to an empty store with autoLoadOnValue and aded above.
                if (!record) {
                    record = me.valueCollection.find(me.valueField, key);
                }
            }
            // record was not found, this could happen because
            // store is not loaded or they set a value not in the store
            if (!record) {
                // If we are allowing insertion of values not represented in the Store, then push the value and
                // create a new record to push as a display value for use by the displayTpl
                if (!forceSelection) {
                    // We are allowing added values to create their own records.
                    // Only if the value is not empty.
                    if (!record && value[i]) {
                        dataObj = {};
                        dataObj[me.displayField] = value[i];
                        if (me.valueField && me.displayField !== me.valueField) {
                            dataObj[me.valueField] = value[i];
                        }
                        Model = store.getModel();
                        record = new Model(dataObj);
                    }
                }
                    // Else, if valueNotFoundText is defined, display it, otherwise display nothing for this value
                else if (me.valueNotFoundRecord) {
                    record = me.valueNotFoundRecord;
                }
            }
            // record found, select it.
            if (record) {
                matchedRecords.push(record);
                valueArray.push(record.get(me.valueField));
            }
        }
        // If the same set of records are selected, this setValue has been a no-op
        if (lastSelection) {
            len = lastSelection.length;
            if (len === matchedRecords.length) {
                for (i = 0; !valueChanged && i < len; i++) {
                    if (Ext.Array.indexOf(me.lastSelection, matchedRecords[i]) === -1) {
                        valueChanged = true;
                    }
                }
            } else {
                valueChanged = true;
            }
        } else {
            valueChanged = matchedRecords.length;
        }
        if (valueChanged) {
            // beginUpdate which means we only want to notify this.onValueCollectionEndUpdate after it's all changed.
            me.suspendEvent('select');
            me.valueCollection.beginUpdate();
            if (matchedRecords.length) {
                selModel.select(matchedRecords, false);
            } else {
                selModel.deselectAll();
            }
            me.valueCollection.endUpdate();
            me.resumeEvent('select');
        } else {
            me.updateValue();
        }
        return me;
    },
    //setValue: function (value) {
    //    var me = this;
    //    // Value needs matching and record(s) need selecting.
    //    if (value !== null && value !== undefined){
    //        if (!value) {
    //            me.isSelectAll = false;
    //        }

    //        //if (me.isSelectAll && !me.isPopWindow) {
    //        //    return me.doSetValue(me.store.getData().items);
    //        //}
    //        return me.doSetValue(value);
    //    } else // Clearing is a special, simpler case.
    //    {
    //        me.suspendEvent('select');
    //        me.valueCollection.beginUpdate();
    //        me.pickerSelectionModel.deselectAll();
    //        me.valueCollection.endUpdate();
    //        me.lastSelectedRecords = null;
    //        me.resumeEvent('select');
    //    }
    //},
    //getValue: function () {
    //    var me = this,
    //        value = me.callParent(arguments);

    //    if (!value) {
    //        return value;
    //    }

    //    if (me.isHandleAllValue && me.multiSelect && me.multiAllValue && Ext.isArray(value)) {
    //        if (me.getAllLength() === value.length) {
    //            me.isSelectAll = true;
    //            return me.multiAllValue;
    //        }
    //        me.isSelectAll = false;
    //    }

    //    return value;
    //},
    onValueCollectionEndUpdate: function () {
        var me = this,
            store = me.store,
            selectedRecords = me.valueCollection.getRange(),
            selectedRecord = selectedRecords[0],
            selectionCount = selectedRecords.length;

        me.updateBindSelection(me.pickerSelectionModel, selectedRecords);

        if (me.isSelectionUpdating()) {
            return;
        }

        Ext.suspendLayouts();

        me.lastSelection = selectedRecords;
        if (selectionCount) {
            // Track the last selection with a value (non blank) for use in
            // assertValue
            me.lastSelectedRecords = selectedRecords;
        }

        //me.setRawValue('121212');

        me.updateValue();

        // If we have selected a value, and it's not possible to select any more values
        // or, we are configured to hide the picker each time, then collapse the picker.
        if (selectionCount && ((!me.multiSelect && store.contains(selectedRecord)) || me.collapseOnSelect || !store.getCount())) {
            me.updatingValue = true;
            me.collapse();
            me.updatingValue = false;
        }
        Ext.resumeLayouts(true);
        if (selectionCount && !me.suspendCheckChange) {
            if (!me.multiSelect) {
                selectedRecords = selectedRecord;
            }
            me.fireEvent('select', me, selectedRecords);
        }
    },
    onBindStore: function (store, initial) {
        var me = this,
            picker = me.picker,
            extraKeySpec,
            valueCollectionConfig;

        // We're being bound, not unbound...
        if (store) {
            // If store was created from a 2 dimensional array with generated field names 'field1' and 'field2'
            if (store.autoCreated) {
                me.queryMode = 'local';
                me.valueField = me.displayField = 'field1';
                if (!store.expanded) {
                    me.displayField = 'field2';
                }
            }
            if (!Ext.isDefined(me.valueField)) {
                me.valueField = me.displayField;
            }
            // Add a byValue index to the store so that we can efficiently look up records by the value field
            // when setValue passes string value(s).
            // The two indices (Ext.util.CollectionKeys) are configured unique: false, so that if duplicate keys
            // are found, they are all returned by the get call.
            // This is so that findByText and findByValue are able to return the *FIRST* matching value. By default,
            // if unique is true, CollectionKey keeps the *last* matching value.
            extraKeySpec = {
                byValue: {
                    rootProperty: 'data',
                    unique: false
                }
            };
            extraKeySpec.byValue.property = me.valueField;
            store.setExtraKeys(extraKeySpec);

            if (me.displayField === me.valueField) {
                store.byText = store.byValue;
            } else {
                extraKeySpec.byText = {
                    rootProperty: 'data',
                    unique: false
                };
                extraKeySpec.byText.property = me.displayField;
                store.setExtraKeys(extraKeySpec);
            }

            // We hold a collection of the values which have been selected, keyed by this field's valueField.
            // This collection also functions as the selected items collection for the BoundList's selection model
            valueCollectionConfig = {
                rootProperty: 'data',
                extraKeys: {
                    byInternalId: {
                        property: 'internalId'
                    },
                    byValue: {
                        property: '', // Set below. This is the name of our valueField
                        rootProperty: 'data'
                    }
                },
                // Whenever this collection is changed by anyone, whether by this field adding to it,
                // or the BoundList operating, we must refresh our value.
                listeners: {
                    beginupdate: me.onValueCollectionBeginUpdate,
                    endupdate: me.onValueCollectionEndUpdate,
                    scope: me
                }
            };
            valueCollectionConfig.extraKeys.byValue.property = me.valueField;

            // This becomes our collection of selected records for the Field.
            me.valueCollection = new Ext.util.Collection(valueCollectionConfig);

            // This is the selection model we configure into the dropdown BoundList.
            // We use the selected Collection as our value collection and the basis
            // for rendering the tag list.
            if (me.multiSelect) {
                me.pickerSelectionModel = new Ext.selection.CheckboxModel({
                    mode: 'SIMPLE',
                    enableInitialSelection: false,
                    pruneRemoved: false,
                    selected: me.valueCollection,
                    store: store
                });
            } else {
                me.pickerSelectionModel = new Ext.selection.DataViewModel({
                    mode: 'SINGLE',
                    enableInitialSelection: false,
                    pruneRemoved: false,
                    selected: me.valueCollection,
                    store: store
                });
            }

            if (!initial) {
                me.resetToDefault();
            }

            if (picker) {
                picker.setSelectionModel(me.pickerSelectionModel);
                if (picker.getStore() !== store) {
                    picker.bindStore(store);
                }
            }
        }
    }
});
/* ***********************************************
 * author :  fei85
 * function: 下拉表格 带选择框 弹出框 全选按钮 多选
 * history:  created by fei85 2017/4/13 16:41:41 
 * ***********************************************/
Ext.define('Fm.ux.form.ComboGridField', {
    extend: 'Ext.form.field.Picker',
    alias: ['widget.combogridfield'],
    twoWayBindable: ['value'],
    editable: true,
    emptyText: '全部',
    showClearTriggers: true,
    multiSelect: true,

    //是否在全选时处理值  为true时 全选的值用 multiAllValue 替代 仅限多选
    isHandleAllValue: false,
    //isHandleAllValue为true时 全选时的替代值
    multiAllValue: null,

    //valueIsArray为true时 单选值也转换为数组
    valueIsArray: false,

    //valueIsString为true时 多选值也转换为字符串 用 valueSplitChar 分隔
    valueIsString: false,
    valueSplitChar: ',',
    applyTriggers: function (triggers) {
        var me = this;
        triggers = {
            clear: {
                cls: 'cisapp-form-field-clear',
                renderTpl: '<div id="{triggerId}" class="{baseCls} {baseCls}-{ui} {cls}"></div>',
                handler: 'onClearClick',
                scope: 'this',
                focusOnMousedown: true
            },
            picker: {
                cls: me.triggerCls,
                handler: 'onTriggerClick',
                scope: 'this',
                focusOnMousedown: true
            }
        };
        if (!me.showClearTriggers) {
            delete triggers.clear;
        }
        return me.callParent([triggers]);
    },
    onClearClick: function (e) {
        this.clearValue();
    },
    createPicker: function () {
        var me = this,
            grid,
            selModel,
            pickerCfg;

        if (me.picker) {
            return me.picker;
        }

        if (me.multiSelect) {
            selModel = {
                selType: "checkboxmodel",
                mode: "SIMPLE",
                allowDeselect: true
            };
        } else {
            selModel = {
                mode: "SINGLE",
                allowDeselect: false
            };
        }
        selModel['listeners'] = {
            'selectionchange': me.onItemSelect,
            scope: me
        };
        pickerCfg = {
            id: me.id + '-picker',
            pickerField: me,
            floating: true,
            hidden: true,
            minWidth: me.minPickerWidth,
            minHeight: me.minPickerHeight,
            maxHeight: me.maxPickerHeight,
            selModel: selModel,
            listeners: {}
        };

        me.originalCollapse = me.collapse;
        if (me.multiSelect) {
            pickerCfg.listeners.show = {
                fn: function () {
                    me.grid.el.on({
                        mouseover: function () {
                            this.collapse = Ext.emptyFn;
                        },
                        mouseout: function () {
                            this.collapse = this.originalCollapse;
                        },
                        scope: me
                    });
                }
            }
        } else {
            pickerCfg.listeners.show = {
                fn: function () {
                    me.grid.el.on({
                        mousedown: function () {
                            this.collapse = Ext.emptyFn;
                        },
                        mouseup: function () {
                            this.collapse = this.originalCollapse;
                        },
                        scope: me
                    });
                }
            }
        }
        grid = me.picker = me.grid = Ext.ComponentManager.create(Ext.apply(me.innerGrid, pickerCfg), "treepanel");

        return grid;
    },
    onItemSelect: function () {
        var me = this,
            grid = me.grid,
            sel = grid.getSelectionModel(),
            records = sel.getSelection();
        me._isSelSet = true;
        me.setConvertValue(records);
        me._isSelSet = false;

        if (!me.multiSelect) {
            me.collapse();
        }
    },
    clearValue: function () {
        var me = this,
            picker = me.picker,
            sel;
        me.setValue(null);
        me.setRawValue('');
        me.lastMutatedValue = null;
        if (picker) {
            sel = picker.getSelectionModel();
            sel.deselectAll();
        }
    },
    onFieldMutation: function (e) {
        var me = this,
            key = e.getKey(),
            isDelete = key === e.BACKSPACE || key === e.DELETE,
            isCtrl = key === e.CTRL,
            rawValue = me.inputEl.dom.value,
            len = rawValue.length;

        if (!me.readOnly && (rawValue !== me.lastMutatedValue || isDelete) && key !== e.TAB) {
            me.lastMutatedValue = rawValue;
            me.lastKey = key;
            if (len && (e.type !== 'keyup' || (!e.isSpecialKey() || isDelete || isCtrl))) {
                me._isInputSet = true;
                me.setValue(rawValue);
                me._isInputSet = false;
            } else {
                me.clearValue();
            }
        }
    },
    getStore: function () {
        var me = this,
            store,
            picker = me.getPicker();

        var bind = picker.getBind();
        if (bind && bind.store) {
            store = picker.getBind().store.getValue();
        }

        if (!store || store.isEmptyStore) {
            var pickerContr = picker.getController();
            if (pickerContr && pickerContr.getGridStore) {
                store = pickerContr.getGridStore();
            }
        }

        if (!store || store.isEmptyStore) {
            store = picker ? picker.getStore() : undefined;
        }
        return store;
    },
    getValue: function () {
        return this.value;
    },
    setValue: function (value) {
        var me = this,
            bind,
            valueBind,
            disTxt = '';

        bind = me.getBind();
        valueBind = bind && bind.value;
        if (valueBind && valueBind.syncing) {
            if ((Ext.isEmpty(value) && Ext.isEmpty(me.value)) || value === me.value) {
                return me;
            } else if (Ext.isArray(value) && Ext.isArray(me.value) && Ext.Array.equals(value, me.value)) {
                return me;
            }
        }

        me.value = me.valueToTrueValue(value);
        if (me.value) {
            if (Ext.isArray(me.value)) {
                disTxt = me.value.join(',');
            } else {
                disTxt = me.value.toString();
            }
        }
        me.setRawValue(disTxt);
        me.checkChange();
        me.refreshEmptyText();

        me.isChangeSelect = (!me._isSelSet && !me._isInputSet && value !== null && value !== undefined);
        if (me.isChangeSelect) {
            var store = me.getStore();
            me.doAutoSelect();
            me.isChangeSelect = false;
        }
        return me;
    },
    doAutoSelect: function () {
        var me = this,
            picker = me.picker,
            sel = picker.getSelectionModel(),
            store = me.getStore(),
            value = me.value,
            selRecords = [];

        if (me.isChangeSelect) {
            var selFn = function () {
                if (!me.destroying && !me.destroyed) {
                    selRecords = me.findRecordByValue(value);
                    if (selRecords && selRecords.length > 0) {
                        sel.select(selRecords, false, true);
                        me.setRawValue(me.getDisplayText(selRecords));
                    }
                }
            }
            if (!store.isEmptyStore && store.isLoaded()) {
                selFn();
            } else {
                store.on('load', selFn, me, { single: true });
            }
        }
        //picker.getNavigationModel().setPosition(itemNode);
    },
    findRecordByValue: function (value) {
        var me = this,
            records = this.getAllRecord(),
            tempVal = value,
            selRecords = [];
        if (!value) {
            return selRecords;
        }
        if (!Ext.isArray(value)) {
            if (me.multiSelect && me.valueIsString) {
                tempVal = value.split(me.valueSplitChar);
            }
            if (!me.multiSelect) {
                tempVal = [value];
            }
        }

        Ext.Array.filter(records, function (item) {
            var tempRe = Ext.Array.findBy(tempVal, function (v) {
                return v == item.get(me.valueField);
            });
            if (tempRe) {
                selRecords.push(item);
            }
        });

        return selRecords;
    },
    getAllRecord: function () {
        return this.getStore().getDataSource().items;
    },
    getAllRecordLength: function () {
        return this.getStore().getCount();
    },
    getDisplayText: function (records) {
        var me = this,
            displayText = '';
        if (me.multiSelect) {
            tempText = [];
            for (var i = 0; i < records.length; i++) {
                tempText.push(records[i].get(me.displayField));
            }
            displayText = tempText.join(',');
        } else {
            if (records.length > 0) {
                displayText = records[0].get(me.displayField);
            }
        }
        return displayText;
    },
    recordToValue: function (records) {
        var me = this,
            value = null;
        if (me.multiSelect) {
            value = [];
            for (var i = 0; i < records.length; i++) {
                value.push(records[i].get(me.valueField));
            }
            if (me.isHandleAllValue && me.getAllRecordLength() === records.length) {
                value = me.multiAllValue;
            }
            if (me.valueIsString && Ext.isArray(value)) {
                value = value.join(me.valueSplitChar);
            }
        } else {
            if (records.length > 0) {
                value = records[0].get(me.valueField);
                if (me.valueIsArray || me.singleIsArray) {
                    value = [value];
                }
            }
        }
        return value;
    },
    valueToTrueValue: function (value) {
        var me = this,
            val = value;
        if (me.multiSelect && !me.valueIsString && value && Ext.isString(value)) {
            val = value.split(me.valueSplitChar);
        }

        if (me.multiSelect && me.valueIsString && value && Ext.isArray(value)) {
            val = value.join(me.valueSplitChar);
        }

        if (!me.multiSelect && (me.valueIsArray || me.singleIsArray) && value && Ext.isString(value)) {
            val = [value];
        }

        if (!me.multiSelect && !(me.valueIsArray || me.singleIsArray) && value && Ext.isArray(value)) {
            val = value.join(me.valueSplitChar);
        }
        if (!val) {
            val = null;
        }
        return val;
    },
    setConvertValue: function (records) {
        var me = this,
            value = me.recordToValue(records),
            displayText = me.getDisplayText(records);
        me.setValue(value);
        me.setRawValue(displayText);
        if (me.callbackChecked) {
            me.callbackChecked(records);
        }
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 下拉表格 带选择框 弹出框 全选按钮 多选
 * history:  created by 苗建龙 2015/6/9 15:12:18 
 * ***********************************************/
Ext.define('Fm.ux.form.ComboTreeField', {
    extend: 'Fm.ux.form.ComboGridField',
    alias: ['widget.combotreefield'],
    valueIsContainRoot: false,
    createPicker: function () {
        var me = this,
            grid,
            pickerCfg;

        pickerCfg = {
            id: me.id + '-picker',
            pickerField: me,
            floating: true,
            hidden: true,
            hideHeaders: true,
            useArrows: true,
            rowLines: true,
            disableSelection: true,
            minWidth: me.minPickerWidth,
            minHeight: me.minPickerHeight,
            maxHeight: me.maxPickerHeight,
            listeners: {
                itemclick: me.onItemClick,
                scope: me
            }
        };
        if (me.multiSelect && !me.valueIsContainRoot) {
            pickerCfg.viewConfig = {
                getRowClass: function (record, rowIndex, rowParams, store) {
                    var css = '';
                    if (!record.get('leaf')) {
                        css += 'x-fm-tree-root';
                    }
                    if (css) {
                        return css;
                    }
                }
            }
        }
        me.originalCollapse = me.collapse;
        if (me.multiSelect) {
            pickerCfg.listeners.show = {
                fn: function () {
                    me.grid.el.on({
                        mouseover: function () {
                            this.collapse = Ext.emptyFn;
                        },
                        mouseout: function () {
                            this.collapse = this.originalCollapse;
                        },
                        scope: me
                    });
                }
            }
        } else {
            pickerCfg.listeners.show = {
                fn: function () {
                    me.grid.el.on({
                        mousedown: function () {
                            this.collapse = Ext.emptyFn;
                        },
                        mouseup: function () {
                            this.collapse = this.originalCollapse;
                        },
                        scope: me
                    });
                }
            }
        }

        grid = me.picker = me.grid = Ext.ComponentManager.create(Ext.apply(me.innerGrid, pickerCfg), "treepanel");
        
        return grid;
    },
    onItemClick: function (obj, record, item, index, e, eOpts) {
        var me = this,
            grid = me.grid,
            target = Ext.get(e.target),
            records;
        if (me.multiSelect) {
            if (!record.get('leaf')) {
                if (target.hasCls('x-tree-checkbox')) {
                    if (!record.get('expanded')) {
                        grid.expandNode(record);
                    }
                    if (Ext.Array.contains(me.selectModel, 'p-c')) {
                        me.checkedChild(record);
                    }
                    e.stopEvent();
                } else {
                    if (!record.get('expanded')) {
                        grid.expandNode(record);
                    } else {
                        grid.collapseNode(record);
                    }
                }
            } else {
                if (!target.hasCls('x-tree-checkbox')) {
                    record.set('checked', !record.get('checked'));
                }
                if (Ext.Array.contains(me.selectModel, 'c-p')) {
                    me.checkedParent(record);
                }
            }
        } else {
            if (!me.valueIsContainRoot && !record.get('leaf')) {
                if (!record.get('expanded')) {
                    grid.expandNode(record);
                } else {
                    grid.collapseNode(record);
                }
                return;
            }
        }

        if (me.multiSelect) {
            records = grid.getChecked();
            if (!me.valueIsContainRoot) {
                records = Ext.Array.filter(records, function (re) {
                    return re.get('leaf');
                });
            }
        } else {
            records = [record];
        }

        me._isSelSet = true;
        me.setConvertValue(records);
        me._isSelSet = false;

        if (!me.multiSelect) {
            me.collapse();
        }
    },
    checkedChild: function (record, checked) {
        var pCheck = checked || record.get('checked');
        for (var i = 0; i < record.childNodes.length; i++) {
            var cCheck = record.childNodes[i].get('checked');
            if (cCheck != pCheck) {
                record.childNodes[i].set('checked', !record.childNodes[i].get('checked'));
            }
            if (record.childNodes[i].childNodes.length > 0) {
                this.checkedChild(record.childNodes[i]);
            }
        }
    },
    checkedParent: function (record) {
        if (record.parentNode) {
            var isHasChildChecked = false;
            record.parentNode.eachChild(function (view) {
                if (view.get('checked')) {
                    isHasChildChecked = true;
                    return false;
                }
            });
            record.parentNode.set('checked', isHasChildChecked);
            if (record.parentNode.parentNode) {
                this.checkedParent(record.parentNode);
            }
        }
    },
    clearTreeChecked: function () {
        var me = this,
            picker = me.picker,
            records;
        if (picker) {
            records = picker.getChecked();
            if (records) {
                Ext.each(records, function (item) {
                    item.set('checked', false);
                });
            }
        }
    },
    clearValue: function () {
        this.setValue(null);
        this.clearTreeChecked();
        this.setRawValue('');
        me.lastMutatedValue = null;
    },
    getAllRecord: function () {
        var me = this,
            tree = me.grid,
            store = me.getStore(),
            root = store.getRoot(),
            recs = [];

        var getLenByNode = function (record) {
            if (!record.get('leaf')) {
                if (me.valueIsContainRoot) {
                    recs.push(record);
                }
                for (var i = 0; i < record.childNodes.length; i++) {
                    getLenByNode(record.childNodes[i]);
                }
            } else {
                recs.push(record);
            }
        }
        getLenByNode(root);
        return recs;
    },
    getAllRecordLength: function () {
        var me = this,
            tree = me.grid,
            len = 0;
        tree.getView().node.cascade(function (rec) {
            if (!(!me.valueIsContainRoot && !rec.get('leaf'))) {
                len++;
            }
        });
        return len;
    },
    doAutoSelect: function () {
        var me = this,
            picker = me.getPicker(),
            store = me.getStore(),
            records = me.getAllRecord(),
            value = me.value,
            selRecords = [];

        if (me.isChangeSelect) {
            var selFn = function () {
                if (!me.destroying && !me.destroyed && me.multiSelect) {
                    Ext.Array.each(records, function (item) {
                        item.set('checked', false);
                    });
                    selRecords = me.findRecordByValue(value);
                    Ext.Array.each(selRecords, function (item) {
                        item.set('checked', true);
                        if (!item.get('leaf')) {
                            if (Ext.Array.contains(me.selectModel, 'p-c')) {
                                me.checkedChild(item);
                            }
                        } else {
                            if (Ext.Array.contains(me.selectModel, 'c-p')) {
                                me.checkedParent(item);
                            }
                        }
                    });
                    me.setRawValue(me.getDisplayText(selRecords));
                }
            }
            if (!store.isEmptyStore) {
                selFn();
            } else {
                store.on('load', selFn, me, { single: true });
            }
        }
        //picker.getNavigationModel().setPosition(itemNode);
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 下拉树形表格 带选择框 全选按钮 多选
 * history:  created by 苗建龙 2015/6/9 15:12:18 
 * history:  update by 苗建龙 2015/8/18 15:12:18 
 *           更新控件逻辑 增加全选时用设定值替代功能
 * ***********************************************/
Ext.define('Fm.ux.form.ComboTreeGrid', {
    extend: 'Fm.ux.form.ComboGrid',
    alias: ['widget.comboxtreegrid', 'widget.combotreegrid'],
    requires: [
        'Ext.tree.Panel'
    ],
    editable: false,

    multiSelect: true,

    /**
     * 值是否包含父级节点
     */
    valueIsContainRoot: false,

    /**
     * 联动选择方式
     * 'p-c'选中父节点的同时选中子节点 'c-p'选中子节点的同时选中父节点
     */
    selectModel: [],

    /**
     * 是否在一级节点只有一组的情况下 展开第一个父节点
     */
    isAutoExpandFirst: true,

    /**
     * 是否在全选时处理值  为true时 全选的值用 multiAllValue 替代 仅限多选
     */
    isHandleAllValue: true,

    /**
     * isHandleAllValue为true时 全选时的替代值
     */
    multiAllValue: [],

    initComponent: function () {
        var me = this,
            triggers = {};

        Ext.log.warn('Fm.ux.form.ComboTreeGrid 不建议继续使用，替代：Fm.ux.form.ComboTreeField');

        me.multiAllTempValue = me.multiAllValue;
        me.callParent(arguments);
    },

    listeners: {
        afterrender: function () {
            var me = this;

            if (me.fakeStore) {
                var children = me.getForData(me.fakeStore);
                if (children && children.length === 1) {
                    me.store = Ext.create('Ext.data.TreeStore', {
                        fields: ['value', 'text'],
                        root:
                        {
                            text: children[0]['text'] || '全部',
                            value: -1,
                            expanded: true,
                            checked: children[0]['checked'],
                            children: children[0]['children']
                        }
                    });
                } else {
                    me.store = Ext.create('Ext.data.TreeStore', {
                        fields: ['value', 'text'],
                        root:
                        {
                            text: '全部',
                            value: -1,
                            expanded: true,
                            checked: false,
                            children: children
                        }
                    });
                }
            }
        }
    },
    getForData: function (data) {
        var getArray = function (data, parent) {
            var cg = [],
                index = 0;

            for (var i = 0; i < data.length; i++) {
                //判断是否有权限
                if (data[i].IsAlloted === true) {
                    if (Ext.isArray(data[i].Children) && data[i].Children.length > 0) {
                        cg[index] = {
                            value: data[i].Id,
                            text: data[i].Name,
                            leaf: data[i].Children.length > 0 ? false : true,
                            checked: false,
                            children: getArray(data[i].Children, data[i].Name)
                        };
                    }
                    else {
                        var items = [];
                        Ext.each(data, function (item) {
                            //添加子节点时，也要判断权限
                            if (item && item.IsAlloted === true) {
                                var childenItem = {
                                    value: item.Id,
                                    text: item.Name,
                                    Id: item.Id,
                                    leaf: true,
                                    checked: false
                                };
                                items.push(childenItem);
                            }
                        });
                        return items;
                    }
                    index = index + 1;
                }
            }
            return cg;
        };
        return getArray(data);
    },

    createPicker: function () {
        var me = this,
            picker;

        picker = me.picker = me.getGridPicker();
        if (me.pageSize) {
            picker.pagingToolbar.on('beforechange', me.onPageChange, me);
        }

        // We limit the height of the picker to fit in the space above
        // or below this field unless the picker has its own ideas about that.
        if (!picker.initialConfig.maxHeight) {
            picker.on({
                beforeshow: me.onBeforePickerShow,
                scope: me
            });
        }
        //picker.getSelectionModel().on({
        //    beforeselect: me.onBeforeSelect,
        //    beforedeselect: me.onBeforeDeselect,
        //    scope: me
        //});

        picker.getNavigationModel().navigateOnSpace = false;

        return picker;
    },

    getAllLength: function () {
        var me = this,
            store;

        if (!me.allLength) {
            store = me.getStore();
            if (!store || store.storeId === 'ext-empty-store') {
                store = me.getBind().store.getValue();
            }
            return me.getTreeStoreLen(store);
        }

        return me.allLength;
    },

    getTreeStoreLen: function (store) {
        var me = this,
            _allLen = 0,
            root = store.getRootNode();

        var getLenByNode = function (node) {
            if (node.get('leaf') !== true) {
                if (me.valueIsContainRoot) {
                    _allLen++;
                }
                for (var i = 0; i < node.childNodes.length; i++) {
                    getLenByNode(node.childNodes[i]);
                }
            } else {
                _allLen++;
            }
        }
        getLenByNode(root);
        return _allLen;
    },

    getGridPicker: function () {
        var me = this,
            coCellTpl;

        var pickerConfig = Ext.apply(me.innerGrid, {
            pickerField: me,
            hidden: true,
            store: me.store,
            displayField: me.displayField,
            //preserveScrollOnRefresh: true,
            pageSize: me.pageSize,
            selModel: me.pickerSelectionModel,
            floating: true,
            minWidth: me.minPickerWidth,
            minHeight: me.minPickerHeight,
            maxHeight: me.maxPickerHeight,
            autoScroll: true,
            allowDeselect: false,
            listeners: {
                checkchange: {
                    fn: me.onSelectItem,
                    scope: me
                },
                render: function () {
                    if (me.isAutoExpandFirst) {
                        var firstNode;
                        if (this.store.rootVisible) {
                            firstNode = this.store.root;
                        } else {
                            var cNodes = this.store.data.item;
                            if (cNodes && cNodes.length === 1) {
                                firstNode = this.store.data.item[0];
                            }
                        }
                        if (firstNode && firstNode.isExpanded() === false) {
                            firstNode.expand();
                        }
                    }
                }
            },
            hideHeaders: true,
            useArrows: true,
            columns: [{
                xtype: 'treecolumn',
                flex: 1,
                notAutoWidth: true,
                dataIndex: me.displayField,
                //picker: me,
                renderer: function (value, metaData) {
                    if (metaData) {
                        metaData.tdAttr = 'data-qtip="' + value + '"';
                    }

                    return value;
                }
            }],
            refresh: function () { }
        });

        //解决火狐下点击选择框关闭的问题
        me.originalCollapse = me.collapse;
        pickerConfig.listeners.show = {
            fn: function () {
                me.picker.el.on({
                    mouseover: function () {
                        this.collapse = Ext.emptyFn;
                    },
                    mouseout: function () {
                        this.collapse = this.originalCollapse;
                    },
                    scope: me
                });
            }
        }

        var picker = Ext.ComponentManager.create(Ext.isFunction(pickerConfig) ? pickerConfig.call() : pickerConfig, "panel");

        return picker;
    },

    checkedNode: function (node, check) {
        node.set('checked', check);
        this.selectNode(node, check);
    },

    selectNodeRecord: function (node, check) {
        var me = this;
        if (check) {
            if (node.get('checked') === true || node.get('checked') === false) {
                node.set('checked', true);
            }
        } else {
            if (node.get('checked') === true || node.get('checked') === false) {
                node.set('checked', false);
            }
        }
    },
    selectNode: function (node, check) {
        var me = this,
            selModel = me.pickerSelectionModel;
        if (!me.valueIsContainRoot && !node.isLeaf()) {
            return;
        }
        me.selectNodeRecord(node, check);
        if (check) {
            selModel.select(node, true, true);
        } else {
            selModel.deselect(node, true);
        }
    },

    checkedChild: function (view, checked) {
        var pCheck = checked || view.get('checked');
        for (var i = 0; i < view.childNodes.length; i++) {
            var cCheck = view.childNodes[i].get('checked');
            if (cCheck != pCheck) {
                this.checkedNode(view.childNodes[i], pCheck);
            }
            if (view.childNodes[i].childNodes.length > 0) {
                this.checkedChild(view.childNodes[i]);
            }
        }
    },

    checkedParent: function (view) {
        if (view.parentNode) {
            var isHasChildChecked = false;
            view.parentNode.eachChild(function (view) {
                if (view.get('checked')) {
                    isHasChildChecked = true;
                    return false;
                }
            });
            this.checkedNode(view.parentNode, isHasChildChecked);
            if (view.parentNode.parentNode) {
                this.checkedParent(view.parentNode);
            }
        }
    },

    onSelectItem: function (node, checked, eOpts) {
        var me = this,
            picker = me.picker,
            records,
            selRecords,
            selModel = me.pickerSelectionModel;

        if (Ext.Array.contains(me.selectModel, 'p-c')) {
            me.checkedChild(node);
        }
        if (Ext.Array.contains(me.selectModel, 'c-p')) {
            me.checkedParent(node);
        }

        this.selectNode(node, checked);
    },

    clearTreeChecked: function () {
        var me = this,
            picker = me.picker,
            records;
        if (picker) {
            records = picker.getChecked();
            if (records) {
                Ext.each(records, function (item) {
                    item.set('checked', false);
                });
                me.pickerSelectionModel.deselectAll();
            }
        }
    },

    getTreeStoreAllData: function () {
        var me = this,
            _allData = [],
            store = me.getStore(),
            root = store.getRootNode();

        var getLenByNode = function (node) {
            if (!node.isLeaf()) {
                if (me.valueIsContainRoot) {
                    _allData.push(node);
                }
                for (var i = 0; i < node.childNodes.length; i++) {
                    getLenByNode(node.childNodes[i]);
                }
            } else {
                _allData.push(node);
            }
        }
        getLenByNode(root);
        return _allData;
    },

    //setValue: function (value) {
    //    var me = this;
    //    // Value needs matching and record(s) need selecting.
    //    if (value != null) {
    //        if (!value) {
    //            me.isSelectAll = false;
    //            return me;
    //        }
    //        if (me.isSelectAll) {
    //            return me.doSetValue(me.getTreeStoreAllData());
    //        }

    //        return me.doSetValue(value);
    //    } else // Clearing is a special, simpler case.
    //    {
    //        me.suspendEvent('select');
    //        me.valueCollection.beginUpdate();
    //        me.pickerSelectionModel.deselectAll();
    //        me.valueCollection.endUpdate();
    //        me.lastSelectedRecords = null;
    //        me.resumeEvent('select');
    //    }
    //},

    //getValue: function () {
    //    var me = this,
    //        value = me.callParent(arguments);
    //    if (me.isHandleAllValue && me.multiSelect && Ext.isArray(value)) {
    //        if (me.getAllLength() === value.length) {
    //            me.isSelectAll = true;
    //            return me.multiAllValue;
    //        }
    //        me.isSelectAll = false;
    //    }
    //    return value;
    //},

    onBindStore: function (store, initial) {
        var me = this,
            picker = me.picker,
            extraKeySpec,
            valueCollectionConfig;

        // We're being bound, not unbound...
        if (store) {
            // If store was created from a 2 dimensional array with generated field names 'field1' and 'field2'
            if (store.autoCreated) {
                me.queryMode = 'local';
                me.valueField = me.displayField = 'field1';
                if (!store.expanded) {
                    me.displayField = 'field2';
                }
            }
            if (!Ext.isDefined(me.valueField)) {
                me.valueField = me.displayField;
            }

            // Add a byValue index to the store so that we can efficiently look up records by the value field
            // when setValue passes string value(s).
            // The two indices (Ext.util.CollectionKeys) are configured unique: false, so that if duplicate keys
            // are found, they are all returned by the get call.
            // This is so that findByText and findByValue are able to return the *FIRST* matching value. By default,
            // if unique is true, CollectionKey keeps the *last* matching value.
            extraKeySpec = {
                byValue: {
                    rootProperty: 'data',
                    unique: false
                }
            };
            extraKeySpec.byValue.property = me.valueField;
            store.setExtraKeys(extraKeySpec);

            if (me.displayField === me.valueField) {
                store.byText = store.byValue;
            } else {
                extraKeySpec.byText = {
                    rootProperty: 'data',
                    unique: false
                };
                extraKeySpec.byText.property = me.displayField;
                store.setExtraKeys(extraKeySpec);
            }

            // We hold a collection of the values which have been selected, keyed by this field's valueField.
            // This collection also functions as the selected items collection for the BoundList's selection model
            valueCollectionConfig = {
                rootProperty: 'data',
                extraKeys: {
                    byInternalId: {
                        property: 'internalId'
                    },
                    byValue: {
                        property: '', // Set below. This is the name of our valueField
                        rootProperty: 'data'
                    }
                },
                // Whenever this collection is changed by anyone, whether by this field adding to it,
                // or the BoundList operating, we must refresh our value.
                listeners: {
                    beginupdate: me.onValueCollectionBeginUpdate,
                    endupdate: me.onValueCollectionEndUpdate,
                    scope: me
                }
            };
            valueCollectionConfig.extraKeys.byValue.property = me.valueField;

            // This becomes our collection of selected records for the Field.
            me.valueCollection = new Ext.util.Collection(valueCollectionConfig);

            // This is the selection model we configure into the dropdown BoundList.
            // We use the selected Collection as our value collection and the basis
            // for rendering the tag list.
            if (me.multiSelect) {
                me.pickerSelectionModel = new Ext.selection.Model({
                    mode: 'SIMPLE',
                    enableInitialSelection: false,
                    checkOnly: true,
                    selected: me.valueCollection,
                    store: store
                });
            } else {
                me.pickerSelectionModel = new Ext.selection.DataViewModel({
                    mode: 'SINGLE',
                    enableInitialSelection: false,
                    pruneRemoved: false,
                    selected: me.valueCollection,
                    store: store
                });
            }
            if (!initial) {
                me.resetToDefault();
            }

            if (picker) {
                //picker.setSelectionModel(me.pickerSelectionModel);
                if (picker.getStore() !== store) {
                    picker.bindStore(store);
                }
            }
        }
    },
    doAutoSelect: function () {

    },

    getRecordByValue: function (nodes, value) {
        var me = this,
            result = null;

        if (!nodes || !nodes.length) return result;
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].get(me.valueField) == value) {
                return nodes[i];
            }
            if (nodes[i].childNodes) {
                result = me.getRecordByValue(nodes[i].childNodes, value);
                if (result != null) return result;
            }
        }
        return result;
    },

    /**
 * Finds the record by searching values in the {@link #valueField}.
 * @param {Object} value The value to match the field against.
 * @return {Ext.data.Model} The matched record or `false`.
 */
    findRecordByValue: function (value) {
        var result = this.getRecordByValue(this.store.data.items, value),
            ret = false;

        // If there are duplicate keys, tested behaviour is to return the *first* match.
        if (result) {
            ret = result[0] || result;
        }
        return ret;
    },

    /**
     * @private
     * Sets or adds a value/values
     */
    doSetValue: function (value /* private for use by addValue */, add) {
        var me = this,
            store = me.getStore(),
            Model = store.getModel(),
            matchedRecords = [],
            valueArray = [],
            autoLoadOnValue = me.autoLoadOnValue,
            isLoaded = store.getCount() > 0 || store.isLoaded(),
            pendingLoad = store.hasPendingLoad(),
            unloaded = autoLoadOnValue && !isLoaded && !pendingLoad,
            forceSelection = me.forceSelection,
            selModel = me.pickerSelectionModel,
            displayIsValue = me.displayField === me.valueField,
            isEmptyStore = store.isEmptyStore,
            lastSelection = me.lastSelection,
            i, len, record, dataObj,
            valueChanged, key;

        //<debug>
        if (add && !me.multiSelect) {
            Ext.raise('Cannot add values to non multiSelect ComboBox');
        }
        //</debug>

        // Called while the Store is loading or we don't have the real store bound yet.
        // Ensure it is processed by the onLoad/bindStore.
        // Even if displayField === valueField, we still MUST kick off a load because even though
        // the value may be correct as the raw value, we must still load the store, and
        // upon load, match the value and select a record sop we can publish the *selection* to
        // a ViewModel.
        if (pendingLoad || unloaded || !isLoaded || isEmptyStore) {

            // If they are setting the value to a record instance, we can
            // just add it to the valueCollection and continue with the setValue.
            // We MUST do this before kicking off the load in case the load is synchronous;
            // this.value must be available to the onLoad handler.
            if (!value.isModel) {
                if (add) {
                    me.value = Ext.Array.from(me.value).concat(value);
                } else {
                    me.value = value;
                }

                me.setHiddenValue(me.value);

                // If we know that the display value is the same as the value, then show it.
                // A store load is still scheduled so that the matching record can be published.
                me.setRawValue(displayIsValue ? value : '');
            }

            // Kick off a load. Doesn't matter whether proxy is remote - it needs loading
            // so we can select the correct record for the value.
            //
            // Must do this *after* setting the value above in case the store loads synchronously
            // and fires the load event, and therefore calls onLoad inline.
            //
            // If it is still the default empty store, then the real store must be arriving
            // in a tick through binding. bindStore will call setValueOnData.
            if (unloaded && !isEmptyStore) {
                store.load();
            }

            // If they had set a string value, another setValue call is scheduled in the onLoad handler.
            // If the store is the defauilt empty one, the setValueOnData call will be made in bindStore
            // when the real store arrives.
            if (!value.isModel || isEmptyStore) {
                return me;
            }
        }

        // This method processes multi-values, so ensure value is an array.
        value = add ? Ext.Array.from(me.value).concat(value) : Ext.Array.from(value);

        // Loop through values, matching each from the Store, and collecting matched records
        for (i = 0, len = value.length; i < len; i++) {
            record = value[i];

            // Set value was a key, look up in the store by that key
            if (!record || !record.isModel) {
                record = me.findRecordByValue(key = record);

                // The value might be in a new record created from an unknown value (if !me.forceSelection).
                // Or it could be a picked record which is filtered out of the main store.
                // Or it could be a setValue(record) passed to an empty store with autoLoadOnValue and aded above.
                if (!record) {
                    record = me.valueCollection.find(me.valueField, key);
                }
            }
            // record was not found, this could happen because
            // store is not loaded or they set a value not in the store
            if (!record) {
                // If we are allowing insertion of values not represented in the Store, then push the value and
                // create a new record to push as a display value for use by the displayTpl
                if (!forceSelection) {

                    // We are allowing added values to create their own records.
                    // Only if the value is not empty.
                    if (!record && value[i]) {
                        dataObj = {};
                        dataObj[me.displayField] = value[i];
                        if (me.valueField && me.displayField !== me.valueField) {
                            dataObj[me.valueField] = value[i];
                        }
                        record = new Model(dataObj);
                    }
                }
                    // Else, if valueNotFoundText is defined, display it, otherwise display nothing for this value
                else if (me.valueNotFoundRecord) {
                    record = me.valueNotFoundRecord;
                }
            }
            // record found, select it.
            if (record) {
                matchedRecords.push(record);
                valueArray.push(record.get(me.valueField));
            }
        }

        // If the same set of records are selected, this setValue has been a no-op
        if (lastSelection) {
            len = lastSelection.length;
            if (len === matchedRecords.length) {
                for (i = 0; !valueChanged && i < len; i++) {
                    if (Ext.Array.indexOf(me.lastSelection, matchedRecords[i]) === -1) {
                        valueChanged = true;
                    }
                }
            } else {
                valueChanged = true;
            }
        } else {
            valueChanged = matchedRecords.length;
        }

        if (valueChanged) {
            if (!me.picker) {
                var dd = me.getPicker();
            }
            // beginUpdate which means we only want to notify this.onValueCollectionEndUpdate after it's all changed.
            me.suspendEvent('select');
            me.valueCollection.beginUpdate();
            if (matchedRecords.length) {
                for (var i = 0; i < matchedRecords.length; i++) {
                    me.onSelectItem(matchedRecords[i], true);
                    //me.selectNodeRecord(matchedRecords[i], true);
                }
            } else {
                me.onSelectItem(store.getRoot(), false);
            }
            me.valueCollection.endUpdate();
            me.resumeEvent('select');
        } else {
            me.updateValue();
        }

        return me;
    }
});


/* ***********************************************
 * author :  苗建龙
 * function: 日期选择控件 带时间
 * history:  created by 苗建龙 2015/6/9 15:12:18 
 * history:  update by 苗建龙 2017/4/1 17:16:48 重写
 * ***********************************************/
Ext.define('Fm.ux.form.DateTimePicker', {
    extend: 'Ext.picker.Date',
    requires: ['Ext.form.field.Number'],
    alias: 'widget.datetimepicker',
    hideOnSelect: false,
    todayText: '现在',
    okText: '确定',
    okTip: '确定选择时间',
    beforeDestroy: function () {
        var me = this;
        if (me.rendered) {
            Ext.destroy(
                me.TimeContainer
            );
        }
        me.callParent();
    },
    initEvents: function () {
        var me = this,
            pickerField = me.pickerField,
            eDate = Ext.Date,
            day = eDate.DAY;
        me.keyNavConfig = Ext.apply(me.keyNavConfig, {
            down: function (e) {
                me.update(eDate.add(me.activeDate, day, 7));
            },
            pageDown: function (e) {
                me.showNextMonth();
            },
            space: function (e) {
                var me = this;
                if (me.TimeContainer) {
                    me.TimeContainer.down('combo[itemId=hours]').focus()
                    return false;
                }
            },
            tab: function () {
                return false;
            }
        });
        me.callParent();
    },
    beforeRender: function () {
        var me = this,
            today = Ext.Date.format(new Date(), me.format);

        var getStore = function (endNum) {
            return Ext.create('Ext.data.Store', {
                fields: ['Text', 'Value'],
                data: (function () {
                    var d = [];
                    for (var i = 0; i < endNum; i++) {
                        var _text = i.toString();
                        if (_text.length === 1) {
                            _text = '0' + _text;
                        }
                        d.push({ Text: _text, Value: i });
                    }
                    return d;
                })()
            });
        };
        var pickerField = {};
        if (me.pickerField) {
            pickerField = me.pickerField;
        }
        me.TimeContainer = Ext.create('Ext.container.Container', {
            scope: me,
            ownerCt: me,
            ownerLayout: me.getComponentLayout(),
            layout: 'column',
            ariaRole: 'presentation',
            padding: '0 0 0 15',
            defaults: {
                xtype: 'combo',
                editable: false,
                enableKeyEvents: true,
                displayField: 'Text',
                valueField: 'Value',
                showClearTriggers: false,
                width: 40
            },
            items: [
                {
                    value: pickerField.lastValue == null ? new Date().getHours() : Ext.Date.format(me.pickerField.lastValue, 'H'),
                    listeners: {
                        keydown: function (me, e, eOpts) {
                            if (e.getKey() == Ext.event.Event.SPACE) {
                                me.next().next().focus();
                                e.stopEvent();
                            }
                        }
                    },
                    store: getStore(24),
                    itemId: 'hours', name: 'time'
                }, { xtype: 'label', text: ':', width: 6 },
                {
                    value: pickerField.lastValue == null ? new Date().getMinutes() : Ext.Date.format(me.pickerField.lastValue, 'i'),
                    store: getStore(60),
                    listeners: {
                        keydown: function (me, e, eOpts) {
                            if (e.getKey() == Ext.event.Event.SPACE) {
                                me.next().next().focus();
                                e.stopEvent();
                            }
                        }
                    },
                    itemId: 'minutes', name: 'time'
                }, { xtype: 'label', text: ':', width: 6 },
                {
                    value: pickerField.lastValue == null ? new Date().getSeconds() : Ext.Date.format(me.pickerField.lastValue, 's'),
                    store: getStore(60),
                    listeners: {
                        keydown: function (me, e, eOpts) {
                            if (e.getKey() == Ext.event.Event.SPACE) {
                                me.next().focus();
                                e.stopEvent();
                            }
                        }
                    },
                    itemId: 'seconds', name: 'time'
                }, {
                    ui: 'default-toolbar',
                    xtype: 'button',
                    text: '确认',
                    width: 45,
                    handler: me.selectTime,
                    scope: me, name: 'time'
                }
            ]
        });
        me.callParent();
    },
    setValue: function (value) {
        if (!Ext.isDate(value)) {
            value = Ext.Date.parse(value || new Date(), this.format);
        }
        this.value = value;
        return this.update(this.value);
    },
    getTimeSp: function () {
        var me = this;
        if (me.TimeContainer) {
            var h = parseInt(me.TimeContainer.down('combo[itemId=hours]').getValue(), 10) * 60 * 60;
            var m = parseInt(me.TimeContainer.down('combo[itemId=minutes]').getValue(), 10) * 60;
            var s = parseInt(me.TimeContainer.down('combo[itemId=seconds]').getValue(), 10);
            return h + m + s;
        }
        return 0;
    },

    handleTabKey: function (e) {
        var me = this,
            t = me.getSelectedDate(me.activeDate),
            handler = me.handler;

        // The following code is like handleDateClick without the e.stopEvent() 
        if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
            me.setValue(Ext.Date.add(new Date(t.dateValue), Ext.Date.SECOND, me.getTimeSp()));
            me.fireEvent('select', me, me.value);
            if (handler) {
                Ext.callback(handler, me.scope, [me, me.value], null, me, me);
            }

            // If the ownerfield is part of an editor we must preventDefault and let 
            // the navigationModel handle the tab event. 
            if (me.pickerField && me.pickerField.isEditorComponent) {
                e.preventDefault();
            }
            me.onSelect();
        }
            // Even if the above condition is not met we have to let the field know 
            // that we're tabbing out - that's user action we can do nothing about 
        else {
            me.fireEventArgs('tabout', [me]);
        }
    },
    /**
     * Respond to a date being clicked in the picker
     * @private
     * @param {Ext.event.Event} e
     * @param {HTMLElement} t
     */
    handleDateClick: function (e, t) {
        var me = this,
            handler = me.handler;

        e.stopEvent();

        if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
            me.setValue(Ext.Date.add(new Date(t.dateValue), Ext.Date.SECOND, me.getTimeSp()));
            //me.fireEvent('select', me, me.value);

            if (handler) {
                Ext.callback(handler, me.scope, [me, me.value], null, me, me);
            }

            // event handling is turned off on hide 
            // when we are using the picker in a field 
            // therefore onSelect comes AFTER the select 
            // event. 
            me.onSelect();
        }
    },
    /**
     * Update the selected cell
     * @private
     * @param {Date} date The new date
     */
    selectedUpdate: function (date) {
        var me = this,
            t = date.getTime();

        me.callParent([Ext.Date.clearTime(new Date(t))]);

        if (me.TimeContainer) {
            me.TimeContainer.down('combo[itemId=hours]').setValue(date.getHours());
            me.TimeContainer.down('combo[itemId=minutes]').setValue(date.getMinutes());
            me.TimeContainer.down('combo[itemId=seconds]').setValue(date.getSeconds());
        }
    },
    /**
     * Sets the current value to today.
     * @return {Ext.picker.Date} this
     */
    selectToday: function () {
        var me = this,
            btn = me.todayBtn,
            handler = me.handler;

        if (btn && !btn.disabled) {
            me.setValue(new Date());
            me.fireEvent('select', me, me.value);
            if (handler) {
                Ext.callback(handler, me.scope, [me, me.value], null, me, me);
            }
            me.onSelect();
        }
        return me;
    },
    selectTime: function (button, e) {
        if (e.getKey() == Ext.event.Event.SPACE) {
            this.focus();
            return;
        }
        var me = this,
            handler = me.handler,
            t = me.activeDate,
            _v = Ext.Date.add(Ext.Date.clearTime(new Date(t)), Ext.Date.SECOND, me.getTimeSp());

        me.setValue(_v);
        me.fireEvent('select', me, me.value);
        if (handler) {
            Ext.callback(handler, me.scope, [me, me.value], null, me, me);
        }
        me.onSelect();

        return me;
    },
    /**
     * @cfg
     * @inheritdoc
     */
    renderTpl: [
        '<div id="{id}-innerEl" data-ref="innerEl" role="presentation">',
            '<div class="{baseCls}-header">',
                '<div id="{id}-prevEl" data-ref="prevEl" class="{baseCls}-prev {baseCls}-arrow" role="presentation" title="{prevText}"></div>',
                '<div id="{id}-middleBtnEl" data-ref="middleBtnEl" class="{baseCls}-month" role="heading">{%this.renderMonthBtn(values, out)%}</div>',
                '<div id="{id}-nextEl" data-ref="nextEl" class="{baseCls}-next {baseCls}-arrow" role="presentation" title="{nextText}"></div>',
            '</div>',
            '<table role="grid" id="{id}-eventEl" data-ref="eventEl" class="{baseCls}-inner" cellspacing="0" tabindex="0" aria-readonly="true">',
                '<thead>',
                    '<tr role="row">',
                        '<tpl for="dayNames">',
                            '<th role="columnheader" class="{parent.baseCls}-column-header" aria-label="{.}">',
                                '<div role="presentation" class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
                            '</th>',
                        '</tpl>',
                    '</tr>',
                '</thead>',
                '<tbody>',
                    '<tr role="row">',
                        '<tpl for="days">',
                            '{#:this.isEndOfWeek}',
                            '<td role="gridcell">',
                                '<div hidefocus="on" class="{parent.baseCls}-date"></div>',
                            '</td>',
                        '</tpl>',
                    '</tr>',
                '</tbody>',
            '</table>',
            '<div id="{id}-timeContainer" data-ref="footerEl" class="{baseCls}-footer">{%this.renderTimeField(values, out)%}</div>',
            '<tpl if="showToday">',
                '<div id="{id}-footerEl" data-ref="footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
            '</tpl>',
            // These elements are used with Assistive Technologies such as screen readers 
            '<div id="{id}-todayText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{todayText}.</div>',
            '<div id="{id}-ariaMinText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaMinText}.</div>',
            '<div id="{id}-ariaMaxText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaMaxText}.</div>',
            '<div id="{id}-ariaDisabledDaysText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaDisabledDaysText}.</div>',
            '<div id="{id}-ariaDisabledDatesText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaDisabledDatesText}.</div>',
        '</div>',
        {
            firstInitial: function (value) {
                return Ext.picker.Date.prototype.getDayInitial(value);
            },
            isEndOfWeek: function (value) {
                // convert from 1 based index to 0 based 
                // by decrementing value once. 
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            renderTodayBtn: function (values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderMonthBtn: function (values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            },
            renderTimeField: function (values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.TimeContainer.getRenderTree(), out);
            }
        }
    ],
    privates: {
        // Do the job of a container layout at this point even though we are not a Container.
        // TODO: Refactor as a Container.
        finishRenderChildren: function () {
            var me = this;
            me.callParent();
            me.TimeContainer.finishRender();
        }
    }
});

Ext.define('Fm.ux.form.DateTimeField', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.datetimefield',
    requires: ['Ext.form.field.Date'],
    format: 'Y-m-d H:i:s',
    createPicker: function () {
        var me = this,
            format = Ext.String.format,
            pickerConfig;

        pickerConfig = {
            pickerField: me,
            floating: true,
            preventRefocus: false,
            hidden: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            ariaDisabledDatesText: me.ariaDisabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            ariaDisabledDaysText: me.ariaDisabledDaysText,
            format: me.format,
            showToday: false,//me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            ariaMinText: format(me.ariaMinText, me.formatDate(me.minValue, me.ariaFormat)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            ariaMaxText: format(me.ariaMaxText, me.formatDate(me.maxValue, me.ariaFormat)),
            listeners: {
                scope: me,
                select: me.onSelect
            },
            keyNavConfig: {
                esc: function () {
                    me.inputEl.focus();
                    me.collapse();
                }
            }
        };

        me.originalCollapse = me.collapse;
        pickerConfig.listeners.show = {
            fn: function () {
                this.picker.el.on({
                    mousedown: function () {
                        this.collapse = Ext.emptyFn;
                    },
                    mouseup: function () {
                        this.collapse = this.originalCollapse;
                    },
                    scope: this
                });
            }
        }
        // Create floating Picker BoundList. It will acquire a floatParent by looking up
        // its ancestor hierarchy (Pickers use their pickerField property as an upward link)
        // for a floating component.
        me.picker = new Fm.ux.form.DateTimePicker(pickerConfig);
        return me.picker;
    }
});
/* ***********************************************
 * author :  李辛  李克一
 * function: 年份选择控件
 * history:  created by 李辛  李克一 2016/5/10 17:16:48 
 * history:  update by 苗建龙 2017/4/1 17:16:48 基于 Ext.picker.Month 重写
 * ***********************************************/
Ext.define('Fm.ux.Year', {
    extend: 'Ext.picker.Month',
    alias: 'widget.Year',
    isYearPicker: true,
    totalYears: 12,
    renderTpl: [
        '<div id="{id}-bodyEl" data-ref="bodyEl" class="{baseCls}-body">',
          '<div id="{id}-monthEl" data-ref="monthEl" class="{baseCls}-months" style="display:none">',
              '<tpl for="months">',
                  '<div class="{parent.baseCls}-item {parent.baseCls}-month">',
                      '<a style="{parent.monthStyle}" role="button" hidefocus="on" class="{parent.baseCls}-item-inner">{.}</a>',
                  '</div>',
              '</tpl>',
          '</div>',
          '<div id="{id}-yearEl" data-ref="yearEl" class="{baseCls}-years" style="width:100%">',
              '<div class="{baseCls}-yearnav">',
                  '<div class="{baseCls}-yearnav-button-ct">',
                      '<a id="{id}-prevEl" data-ref="prevEl" class="{baseCls}-yearnav-button {baseCls}-yearnav-prev" hidefocus="on" role="button"></a>',
                  '</div>',
                  '<div class="{baseCls}-yearnav-button-ct">',
                      '<a id="{id}-nextEl" data-ref="nextEl" class="{baseCls}-yearnav-button {baseCls}-yearnav-next" hidefocus="on" role="button"></a>',
                  '</div>',
              '</div>',
              '<tpl for="years">',
                  '<div class="{parent.baseCls}-item {parent.baseCls}-year">',
                      '<a hidefocus="on" class="{parent.baseCls}-item-inner" role="button">{.}</a>',
                  '</div>',
              '</tpl>',
          '</div>',
          '<div class="' + Ext.baseCSSPrefix + 'clear"></div>',
          '<tpl if="showButtons">',
              '<div class="{baseCls}-buttons">{%',
                  'var me=values.$comp, okBtn=me.okBtn, cancelBtn=me.cancelBtn;',
                  'okBtn.ownerLayout = cancelBtn.ownerLayout = me.componentLayout;',
                  'okBtn.ownerCt = cancelBtn.ownerCt = me;',
                  'Ext.DomHelper.generateMarkup(okBtn.getRenderTree(), out);',
                  'Ext.DomHelper.generateMarkup(cancelBtn.getRenderTree(), out);',
              '%}</div>',
          '</tpl>',
        '</div>'
    ],
    okText: '确定',
    cancelText: '取消',
    width: 210,
    onYearClick: function (target, isDouble) {
        var me = this;
        me.value[1] = me.activeYear + me.years.indexOf(target);

        me.updateBody();
        me.fireEvent('year' + (isDouble ? 'dbl' : '') + 'click', me, me.value);
        me.fireEvent('select', me, me.value);
    },
    getYears: function () {
        var me = this,
            start = me.activeYear,
            end = start + 12,
            i = start,
            years = [];

        for (; i < end; ++i) {
            years.push(i, ++i);
        }

        return years;
    }
});

/* ***********************************************
 * author :  李辛  李克一
 * function: 年份选择控件
 * history:  created by 李辛  李克一 2016/5/10 17:16:48 
 * ***********************************************/
Ext.define('Fm.ux.form.DateYearField', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.dateyearfield',
    requires: ['Fm.ux.Year'],
    format: 'Y',
    formatText: '日期格式要求为年份',
    createPicker: function () {
        var me = this,
        format = Ext.String.format,
        pickerConfig;


        pickerConfig = {
            ownerCmp: me,
            floating: true,
            hidden: true,
            small: true,
            listeners: {
                scope: me,
                cancelclick: me.collapse,
                okclick: me.onYearSelect,
                yeardblclick: me.onYearSelect
            },
            keyNavConfig: {
                esc: function () {
                    me.collapse();
                }
            }
        };

        me.originalCollapse = me.collapse;
        pickerConfig.listeners.show = {
            fn: function () {
                this.picker.el.on({
                    mousedown: function () {
                        this.collapse = Ext.emptyFn;
                    },
                    mouseup: function () {
                        this.collapse = this.originalCollapse;
                    },
                    scope: this
                });
            }
        }

        if (me.pickerOptions) {
            Ext.apply(pickerConfig, me.pickerOptions, me.monthPickerOptions || {});
        }
        return Ext.create('Fm.ux.Year', pickerConfig);
    },
    onYearSelect: function (picker, value) {
        var me = this,
        month = value[0],
        year = value[1],
        date = new Date(year, month, 1);
        if (date.getMonth() !== month) {
            date = new Date(year, month, 1).getLastDateOfMonth();
        }
        me.setValue(date);
        me.fireEvent('select', me, date);
        me.collapse();
    }
});
/* ***********************************************
 * author :  闫刘盘 韩奎奎
 * function: 文件上传按扭控件，支持暂停，断点续传，进度显示等
 * history:  created by 闫刘盘 韩奎奎 2015/8/9 15:12:18 
 * ***********************************************/

Ext.define('Fm.ux.form.FileUpload', {
    extend: 'Ext.form.field.File',
    alias: ['widget.fileupload'],
    alternateClassName: ['Ext.form.FileUploadField', 'Ext.ux.form.FileUploadField', 'Ext.form.File'],
    requires: [
        'Ext.form.field.FileButton',
        'Ext.form.trigger.Component'
    ],
    needArrowKeys: false,
    auto: null,
    //是否多文件上传
    multiple:false,
    compressMode: false,
    //webuploader
    uploader: null,
    //滚动条
    progressBar: null,
    //实际文件名
    fileName: null,
    //服务端返回的全部文件名数据
    AllFiles: [],
    //是否日期分隔 
    dateSeparate: true,
    //当前文件对象数组
    filePrevious: [],
    onRender: function () {
        var me = this;

        me.callParent(arguments);
        me.rendWebUpload(me.button.id);
    },

    //添加外部滚动条
    setProgressBar: function (progressbar) {
        var me = this;

        me.progressBar = progressbar;
    },
    //开始上传或继续上传
    startUpload: function (options) {
        var me = this,
            uploader = me.uploader;

        if (typeof options === 'function') {
            options = {
                callback: options
            };
        }
        else {
            options = Ext.apply({}, options);
        }

        if (uploader) {
            uploader.upload();
        }

        Ext.apply(me, options);

    },
    //停止上传 paused
    stopUpload: function () {
        var me = this,
            uploader = me.uploader;

        if (uploader) {
            uploader.stop(true);
        }
    },
    //重试上传
    retryUpload: function () {
        var me = this,
            uploader = me.uploader;

        if (uploader) {
            uploader.retry();
        }
    },

    //移除文件
    removeFile: function () {
        var me = this,
            uploader = me.uploader;

        me.setTextContent();

        if (uploader) {
            Ext.Array.each(me.filePrevious, function (f) {
                uploader.removeFile(f, true);
            });
            uploader.reset();
        }
    },

    //取消上传
    cancelFile: function () {
        var me = this,
            uploader = me.uploader;

        if (uploader && uploader.isInProgress()) {
            uploader.cancelFile(uploader.getFiles('progress'));
        }
    },
    //获取所选文件
    getFiles: function () {
        var me = this,
            uploader = me.uploader;

        if (uploader) {
            return uploader.getFiles('inited');
        }
    },
    //获取文件上传后的文件名 以GUID命名
    getFileName: function () {
        var me = this;

        return me.fileName;
    },
    //获取文件上传后的文件名 以GUID命名
    setFileName: function (name) {
        var me = this,
            uploader = me.uploader;

        me.fileName = name;

        uploader.option('formData', {
            fileName: name
        });

    },
    //设置文本框的内容
    setTextContent:function(files) {
        var me = this,
            result = '';

        Ext.Array.each(files, function (f) {
            result = result + ',' + f.name
        });

        if (result.length>0) {
            result = result.substring(1);
        }

        me.setRawValue(result);
        me.fireEvent('fileChange', result);
    },
    rendWebUpload: function (buttonId) {
        var me = this,
            guid, datePath,
            dateSeparate = me.dateSeparate,
            inBuiltProgressBar = true,
            //分块大小：1024 * 1024 为1M
            nChunkSize = 1024 * 1024;

        if (me.progressBar) {
            me.progressBar.hide();
        }
        else {
            inBuiltProgressBar = false;
        }

        WebUploader.Uploader.register({
            'before-send': 'checkchunk'
        }, {
            checkchunk: function (block) {
                var blob = block.blob.getSource(),
                    owner = this.owner,
                    deferred = WebUploader.Deferred();

                Ext.Ajax.request({
                    url: 'fmshared/file/chunkcheck',
                    method: 'post',
                    params: { guid: guid, chunk: block.chunk, fileName: block.file.name },
                    success: function (res) {
                        var resText = Ext.util.JSON.decode(res.responseText);//获取服务端操作返回值
                        if (resText.isSuccess) {
                            deferred.reject();
                        } else {
                            deferred.resolve();
                        }
                    }
                });

                return deferred.promise();
            }
        });

        //创建一个WebUploader
        var uploader = WebUploader.create({
            auto: me.auto,
            swf: AppConfig.urlStartWith + 'lib/webuploader/Uploader.swf',
            server: AppConfig.urlStartWith + 'fmshared/file/upload',
            //1024 * 1024 为1M
            chunkSize: nChunkSize, //设置分段大小
            chunked: true, //对大文件是否设置分段
            chunkRetry: 1,
            threads: 1,
            fileSingleSizeLimit: me.fileSingleSizeLimit,//上传文件的最大值
            resize: false,
            duplicate:true,//重复上传
            formData: {
                savePath: me.savePath,//文件保存的业务路径
                compressMode: me.compressMode,//是否开启解压缩
                chunkSize: nChunkSize
            },
            pick: {
                //是不可以进行多先
                multiple: me.multiple,
                id: '#' + buttonId
            },
            accept: {
                //设置可上传的文件扩展名
                extensions: me.extensions
            }
        });
        me.uploader = uploader;

        //错误事件
        uploader.on('error', function (msg) {
            if (msg === 'F_DUPLICATE') {
                Fm.msg.info('文件重复添加');
            }
            else if (msg === 'Q_TYPE_DENIED') {
                Fm.msg.info('文件类型选择出错，请重试');
            }
            else if (msg === 'F_EXCEED_SIZE') {
                Fm.msg.info('文件过大，请压缩后再进行上传');
            }
            else {
                Fm.msg.info('出错' + msg);
            }
        });

        //进度条事件
        uploader.on('uploadProgress', function (file, percentage) {
            var process,
                percent = Math.floor(percentage * 100);

            if (me.progressBar) {

                me.progressBar.show();

                if (percent === 100) {
                    process = 1;
                } else {
                    process = percentage;
                }
                me.progressBar.setValue(process, '' + file.name + '　正在处理文件...');
            }
        });

        // 当有一批文件添加进来的时候
        uploader.on('filesQueued', function (files) {
            //设置控件显示的文件名列表
            me.setTextContent(files);

            //第二次选择会把第一次选择的文件覆盖掉，把第一次选择的都删除
            if (me.filePrevious) {
                Ext.Array.each(me.filePrevious, function (f) {
                    uploader.removeFile(f.id);
                });
            }
            me.filePrevious = files;

            //后台已guid作为文件名
            guid = Fm.Common.Util.Guid().replace(/\s/g, '');

            if (dateSeparate) {
                var date = Fm.Common.Util.getNowDate();
                datePath = Ext.util.Format.date(date, 'Y-m-d');
                uploader.option('formData', {
                    guid: guid,
                    datePath: datePath
                });
            } else {
                uploader.option('formData', {
                    guid: guid
                });
            }
        });

        //成功事件,  针对一个文件
        uploader.on('uploadSuccess', function (file, response) {

            uploader.removeFile(file);

            if (inBuiltProgressBar) {
                me.progressBar.hide();
            }

            Ext.Ajax.request({
                url: 'fmshared/file/UploadSuccess',
                async: false,
                method: 'post',
                params: {
                    fileName: response.name,
                    businessPath: me.savePath,
                    datePath: datePath,
                    compressMode: me.compressMode
                },
                success: function (res) {
                    var resText = Ext.util.JSON.decode(res.responseText);//获取服务端操作返回值

                    if (resText.IsSuccess) {

                        me.AllFiles = resText.Result.reduce(function (coll, item) {
                            coll.push(item);
                            return coll;
                        }, me.AllFiles);

                    } else {
                        Fm.msg.info('附件上传失败');

                    }
                }
            });
        });

        //所有文件上传完成事件
        uploader.on('uploadFinished', function () {
            //控件内容变化，通知调用者
            me.setTextContent();

            //清空队列
            uploader.reset();
            me.filePrevious = [];

            me.fireEvent('uploadSuccess', me.AllFiles);

            if (me.callback) {
                me.callback(me.AllFiles);
                me.AllFiles = [];
            }
        });

        //失败事件
        uploader.on('uploadError', function (file) {

            me.setTextContent();
            uploader.removeFile(file, true);

            if (me.callback) {
                me.callback(null);
            }
            Fm.msg.info('附件上传失败');
        });
    },
    onDestroy: function () {
        var me = this;

        me.uploader.destroy();
        me.callParent();
    }
});

/* ***********************************************
 * author :  苗建龙
 * function: 月份选择控件
 * history:  created by 苗建龙 2015/6/9 15:12:18 
 * ***********************************************/
Ext.define('Fm.ux.form.MonthDate', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.monthdatefield',
    requires: ['Ext.picker.Month'],
    alternateClassName: ['Ext.form.MonthDateField', 'Ext.form.MonthDate'],
    format: 'Y-m',
    createPicker: function () {
        var me = this,
        format = Ext.String.format,
        pickerConfig, monthPickerOptions;
        if (me.okText) {
            monthPickerOptions = monthPickerOptions || {};
            monthPickerOptions.okText = me.okText;
        }
        if (me.cancelText) {
            monthPickerOptions = monthPickerOptions || {};
            monthPickerOptions.cancelText = me.cancelText;
        }

        pickerConfig = {
            ownerCmp: me,
            floating: true,
            hidden: true,
            small: true,
            listeners: {
                scope: me,
                cancelclick: me.collapse,
                okclick: me.onMonthSelect,
                yeardblclick: me.onMonthSelect,
                monthdblclick: me.onMonthSelect
            },
            keyNavConfig: {
                esc: function () {
                    me.collapse();
                }
            }
        };
        //if (Ext.isChrome) {
        me.originalCollapse = me.collapse;
        pickerConfig.listeners.show = {
            fn: function () {
                this.picker.el.on({
                    mousedown: function () {
                        this.collapse = Ext.emptyFn;
                    },
                    mouseup: function () {
                        this.collapse = this.originalCollapse;
                    },
                    scope: this
                });
            }
        }
        //}
        if (me.pickerOptions) {
            Ext.apply(pickerConfig, me.pickerOptions, monthPickerOptions || {});
        }
        return Ext.create('Ext.picker.Month', pickerConfig);
    },
    onMonthSelect: function (picker, value) {
        var me = this,
        month = value[0],
        year = value[1],
        date = new Date(year, month, 1);

        if (date.getMonth() !== month) {
            date = new Date(year, month, 1).getLastDateOfMonth();
        }
        me.setValue(date);
        me.fireEvent('select', me, date);
        me.collapse();
    }
});
/**
 * ListBox
 */
Ext.define('Fm.ux.form.MultiSelect', {

    extend: 'Ext.form.FieldContainer',

    mixins: [
        'Ext.util.StoreHolder',
        'Ext.form.field.Field'
    ],

    alternateClassName: ['Ext.ux.Multiselect', 'Fm.ux.MultiSelect'],
    alias: ['widget.multiselectfield', 'widget.multiselect'],

    requires: [
        'Ext.panel.Panel',
        'Ext.view.BoundList',
        'Ext.layout.container.Fit',
        'Ext.data.StoreManager'
    ],

    uses: ['Ext.view.DragZone', 'Ext.view.DropZone'],

    layout: 'anchor',
    publishes: ['value', 'selection', 'validators', 'store'],
    twoWayBindable: ['value', 'selection', 'store'],
    defaultBindProperty: 'value',
    config: {
        validationField: null,
        validation: null,
        selection: null
    },
    /**
     * 选中方式 item  checkbox:选择框
     */
    selectionMode: "item",
    /**
     * @cfg {String} [dragGroup=""] The ddgroup name for the MultiSelect DragZone.
     */

    /**
     * @cfg {String} [dropGroup=""] The ddgroup name for the MultiSelect DropZone.
     */

    /**
     * @cfg {String} [title=""] A title for the underlying panel.
     */

    /**
     * @cfg {Boolean} [ddReorder=false] Whether the items in the MultiSelect list are drag/drop reorderable.
     */
    ddReorder: false,

    /**
     * @cfg {Object/Array} tbar An optional toolbar to be inserted at the top of the control's selection list.
     * This can be a {@link Ext.toolbar.Toolbar} object, a toolbar config, or an array of buttons/button configs
     * to be added to the toolbar. See {@link Ext.panel.Panel#tbar}.
     */

    /**
     * @cfg {String} [appendOnly=false] `true` if the list should only allow append drops when drag/drop is enabled.
     * This is useful for lists which are sorted.
     */
    appendOnly: false,

    /**
     * @cfg {String} [displayField="text"] Name of the desired display field in the dataset.
     */
    displayField: 'text',

    /**
     * @cfg {String} [valueField="text"] Name of the desired value field in the dataset.
     */

    /**
     * @cfg {Boolean} [allowBlank=true] `false` to require at least one item in the list to be selected, `true` to allow no
     * selection.
     */
    allowBlank: true,

    /**
     * @cfg {Number} [minSelections=0] Minimum number of selections allowed.
     */
    minSelections: 0,

    /**
     * @cfg {Number} [maxSelections=Number.MAX_VALUE] Maximum number of selections allowed.
     */
    maxSelections: Number.MAX_VALUE,

    /**
     * @cfg {String} [blankText="This field is required"] Default text displayed when the control contains no items.
     */
    blankText: '为必选项',

    /**
     * @cfg {String} [minSelectionsText="Minimum {0}item(s) required"] 
     * Validation message displayed when {@link #minSelections} is not met. 
     * The {0} token will be replaced by the value of {@link #minSelections}.
     */
    minSelectionsText: '至少需要选择 {0} 项',

    /**
     * @cfg {String} [maxSelectionsText="Maximum {0}item(s) allowed"] 
     * Validation message displayed when {@link #maxSelections} is not met
     * The {0} token will be replaced by the value of {@link #maxSelections}.
     */
    maxSelectionsText: '最多选择 {0} 项',

    /**
     * @cfg {String} [delimiter=","] The string used to delimit the selected values when {@link #getSubmitValue submitting}
     * the field as part of a form. If you wish to have the selected values submitted as separate
     * parameters rather than a single delimited parameter, set this to `null`.
     */
    delimiter: ',',

    /**
     * @cfg {String} [dragText="{0} Item{1}"] The text to show while dragging items.
     * {0} will be replaced by the number of items. {1} will be replaced by the plural
     * form if there is more than 1 item.
     */
    dragText: '{0} Item{1}',

    /**
     * @cfg {Ext.data.Store/Array} store The data source to which this MultiSelect is bound (defaults to `undefined`).
     * Acceptable values for this property are:
     * <div class="mdetail-params"><ul>
     * <li><b>any {@link Ext.data.Store Store} subclass</b></li>
     * <li><b>an Array</b> : Arrays will be converted to a {@link Ext.data.ArrayStore} internally.
     * <div class="mdetail-params"><ul>
     * <li><b>1-dimensional array</b> : (e.g., <tt>['Foo','Bar']</tt>)<div class="sub-desc">
     * A 1-dimensional array will automatically be expanded (each array item will be the combo
     * {@link #valueField value} and {@link #displayField text})</div></li>
     * <li><b>2-dimensional array</b> : (e.g., <tt>[['f','Foo'],['b','Bar']]</tt>)<div class="sub-desc">
     * For a multi-dimensional array, the value in index 0 of each item will be assumed to be the combo
     * {@link #valueField value}, while the value at index 1 is assumed to be the combo {@link #displayField text}.
     * </div></li></ul></div></li></ul></div>
     */

    ignoreSelectChange: 0,

    /**
     * @cfg {Object} listConfig
     * An optional set of configuration properties that will be passed to the {@link Ext.view.BoundList}'s constructor.
     * Any configuration that is valid for BoundList can be included.
     */

    //TODO - doc me.addEvents('drop');
    multiSelect: true,
    initComponent: function () {
        var me = this;
        me.items = me.setupItems();

        me.bindStore(me.store || me.getBind().store.getValue(), true);

        if (me.store.autoCreated) {
            me.valueField = me.displayField = 'field1';
            if (!me.store.expanded) {
                me.displayField = 'field2';
            }
        }

        if (!Ext.isDefined(me.valueField)) {
            me.valueField = me.displayField;
        }

        me.callParent();
        me.initField();
    },
    setupItems: function () {
        var me = this;

        me.selectionModel = new Ext.selection.DataViewModel({
            mode: me.multiSelect ? 'SIMPLE' : 'SINGLE',
            //enableInitialSelection: false,
            allowDeselect: false
        });

        var getInnerTpl = function (displayField) {
            return '<div class="x-boundlist-item-cis-item"><i class="x-boundlist-item-cis-checker"></i>' +
                '<span <tpl if="_rowclass">class="{_rowclass}"</tpl>>{' + displayField + '}</span></div>';
        };
        var tpl = null;
        if (me.selectionMode === 'checkbox') {
            tpl = '<tpl for=".">' +
                    '<li role="option" unselectable="on" class="x-boundlist-item-cis">' + getInnerTpl(me.displayField) + '</li>' +
                 '</tpl>';
            if (!me.listConfig) {
                me.listConfig = {};
            }
            me.listConfig.itemCls = 'x-boundlist-item-cis-item';
        } else {
            tpl = '<tpl for=".">' +
                '<li role="option" unselectable="on" class="' + Ext.baseCSSPrefix + 'boundlist-item' + '  <tpl if="_rowclass">{_rowclass}</tpl>">{' + me.displayField + '}</li>' +
            '</tpl>'
        }

        me.boundList = Ext.create('Ext.view.BoundList', Ext.apply({
            anchor: 'none 100%',
            border: 1,
            selectionModel: me.selectionModel,
            store: me.store,
            displayField: me.displayField,
            disabled: me.disabled,
            tpl: tpl,
            onContainerClick: function (e) {
                return false
            }
        }, me.listConfig));

        me.boundList.getSelectionModel().on('selectionchange', me.onSelectChange, me);

        // Boundlist expects a reference to its pickerField for when an item is selected (see Boundlist#onItemClick).
        me.boundList.pickerField = me;

        // Only need to wrap the BoundList in a Panel if we have a title.
        if (!me.title) {
            return me.boundList;
        }

        // Wrap to add a title
        me.boundList.border = false;
        return {
            border: true,
            anchor: 'none 100%',
            layout: 'anchor',
            title: me.title,
            tbar: me.tbar,
            items: me.boundList
        };
    },

    onSelectChange: function (selModel, selections) {
        if (!this.ignoreSelectChange) {
            this.setValue(selections);
        }
    },

    getSelected: function () {
        return this.boundList.getSelectionModel().getSelection();
    },

    // compare array values
    isEqual: function (v1, v2) {
        var fromArray = Ext.Array.from,
            i = 0,
            len;

        v1 = fromArray(v1);
        v2 = fromArray(v2);
        len = v1.length;

        if (len !== v2.length) {
            return false;
        }

        for (; i < len; i++) {
            if (v2[i] !== v1[i]) {
                return false;
            }
        }

        return true;
    },

    afterRender: function () {
        var me = this,
            records;

        me.callParent();
        if (me.selectOnRender) {
            records = me.getRecordsForValue(me.value);
            if (records.length) {
                ++me.ignoreSelectChange;
                me.boundList.getSelectionModel().select(records);
                --me.ignoreSelectChange;
            }
            delete me.toSelect;
        }

        if (me.ddReorder && !me.dragGroup && !me.dropGroup) {
            me.dragGroup = me.dropGroup = 'MultiselectDD-' + Ext.id();
        }

        if (me.draggable || me.dragGroup) {
            me.dragZone = Ext.create('Ext.view.DragZone', {
                view: me.boundList,
                ddGroup: me.dragGroup,
                dragText: me.dragText
            });
        }
        if (me.droppable || me.dropGroup) {
            me.dropZone = Ext.create('Ext.view.DropZone', {
                view: me.boundList,
                ddGroup: me.dropGroup,
                handleNodeDrop: function (data, dropRecord, position) {
                    var view = this.view,
                        store = view.getStore(),
                        records = data.records,
                        index;

                    // remove the Models from the source Store
                    data.view.store.remove(records);

                    index = store.indexOf(dropRecord);
                    if (position === 'after') {
                        index++;
                    }
                    store.insert(index, records);
                    view.getSelectionModel().select(records);
                    me.fireEvent('drop', me, records);
                }
            });
        }
    },

    isValid: function () {
        var me = this,
            disabled = me.disabled,
            validate = me.forceValidation || !disabled;


        return validate ? me.validateValue(me.value) : disabled;
    },

    validateValue: function (value) {
        var me = this,
            errors = me.getErrors(value),
            isValid = Ext.isEmpty(errors);

        if (!me.preventMark) {
            if (isValid) {
                me.clearInvalid();
            } else {
                me.markInvalid(errors);
            }
            me.boundList[isValid ? 'removeCls' : 'addCls']([
                'x-form-trigger-wrap-default', 'x-form-trigger-wrap-invalid'
            ]);
        }

        return isValid;
    },

    markInvalid: function (errors) {
        // Save the message and fire the 'invalid' event
        var me = this,
            oldMsg = me.getActiveError();
        me.setActiveErrors(Ext.Array.from(errors));
        if (oldMsg !== me.getActiveError()) {
            me.updateLayout();
        }
    },
    /**
     * Clear any invalid styles/messages for this field.
     *
     * __Note:__ this method does not cause the Field's {@link #validate} or {@link #isValid} methods to return `true`
     * if the value does not _pass_ validation. So simply clearing a field's errors will not necessarily allow
     * submission of forms submitted with the {@link Ext.form.action.Submit#clientValidation} option set.
     */
    clearInvalid: function () {
        // Clear the message and fire the 'valid' event
        var me = this,
            hadError = me.hasActiveError();
        me.unsetActiveError();
        if (hadError) {
            me.updateLayout();
        }
    },

    getSubmitData: function () {
        var me = this,
            data = null,
            val;
        if (!me.disabled && me.submitValue && !me.isFileUpload()) {
            val = me.getSubmitValue();
            if (val !== null) {
                data = {};
                data[me.getName()] = val;
            }
        }
        return data;
    },

    /**
     * Returns the value that would be included in a standard form submit for this field.
     *
     * @return {String} The value to be submitted, or `null`.
     */
    getSubmitValue: function () {
        var me = this,
            delimiter = me.delimiter,
            val = me.getValue();

        return Ext.isString(delimiter) ? val.join(delimiter) : val;
    },

    getValue: function () {
        return this.value || [];
    },

    getRecordsForValue: function (value) {
        var me = this,
            records = [],
            all = me.store.getRange(),
            valueField = me.valueField,
            i = 0,
            allLen = all.length,
            rec,
            j,
            valueLen;

        for (valueLen = value.length; i < valueLen; ++i) {
            for (j = 0; j < allLen; ++j) {
                rec = all[j];
                if (rec.get(valueField) == value[i]) {
                    records.push(rec);
                }
            }
        }

        return records;
    },

    setupValue: function (value) {
        var delimiter = this.delimiter,
            valueField = this.valueField,
            i = 0,
            out,
            len,
            item;

        if (Ext.isDefined(value)) {
            if (delimiter && Ext.isString(value)) {
                value = value.split(delimiter);
            } else if (!Ext.isArray(value)) {
                value = [value];
            }

            for (len = value.length; i < len; ++i) {
                item = value[i];
                if (item && item.isModel) {
                    value[i] = item.get(valueField);
                }
            }
            out = Ext.Array.unique(value);
        } else {
            out = [];
        }
        return out;
    },

    setValue: function (value) {
        var me = this,
            selModel = me.boundList.getSelectionModel(),
            store = me.store;

        // Store not loaded yet - we cannot set the value
        if (!store.getCount()) {
            store.on({
                load: Ext.Function.bind(me.setValue, me, [value]),
                single: true
            });
            return;
        }

        value = me.setupValue(value);
        me.mixins.field.setValue.call(me, value);

        if (me.rendered) {
            ++me.ignoreSelectChange;
            selModel.deselectAll();
            if (value.length) {
                selModel.select(me.getRecordsForValue(value), false, true);
            }
            --me.ignoreSelectChange;
        } else {
            me.selectOnRender = true;
        }
    },

    clearValue: function () {
        this.setValue([]);
    },

    onEnable: function () {
        var list = this.boundList;
        this.callParent();
        if (list) {
            list.enable();
        }
    },

    onDisable: function () {
        var list = this.boundList;
        this.callParent();
        if (list) {
            list.disable();
        }
    },

    getErrors: function (value) {
        var me = this,
            format = Ext.String.format,
            errors = [],
            numSelected;

        value = Ext.Array.from(value || me.getValue());
        numSelected = value.length;

        if (!me.allowBlank && numSelected < 1) {
            errors.push(me.blankText);
        }
        if (numSelected < me.minSelections) {
            errors.push(format(me.minSelectionsText, me.minSelections));
        }
        if (numSelected > me.maxSelections) {
            errors.push(format(me.maxSelectionsText, me.maxSelections));
        }
        return errors;
    },

    onDestroy: function () {
        var me = this;

        me.bindStore(null);
        Ext.destroy(me.dragZone, me.dropZone);
        me.callParent();
    },

    onBindStore: function (store) {
        var boundList = this.boundList;

        if (boundList) {
            boundList.bindStore(store);
        }
    }

});

/* ***********************************************
 * author :  fei85
 * function: 
 * history:  created by fei85 2016/3/3 9:45:57 
 * ***********************************************/
Ext.define("Fm.ux.form.UEditor", {
    extend: 'Ext.form.field.TextArea',
    alias: ['widget.ueditor'],

    fieldSubTpl: [
        '<textarea id="{id}-ue" autocomplete="off">\n',
            '<tpl if="value">{[Ext.util.Format.htmlEncode(values.value)]}</tpl>',
        '</textarea>',
        '<textarea id="{id}" data-ref="inputEl" style="display:none" ',
            '<tpl if="name"> name="{name}"</tpl>',
            ' autocomplete="off">\n',
            '<tpl if="value">{[Ext.util.Format.htmlEncode(values.value)]}</tpl>',
        '</textarea>',
        {
            disableFormats: true
        }
    ],
    width: 700,
    config: {
        ueditorConfig: {}
    },
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    },
    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        if (!me.ue) {
            me.ue = UE.getEditor(me.getInputId() + '-ue', Ext.apply(me.ueditorConfig, {
                initialFrameHeight: me.height || '300px',
                initialFrameWidth: '100%',
                "imageActionName": "uploadimage",
                "imageFieldName": "upfile",
                "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
                "imageCompressEnable": false,
                "imageInsertAlign": "none",
                "imageUrlPrefix": "",
                "fileActionName": "uploadfile",
                "fileFieldName": "upfile",
                "fileUrlPrefix": "",
                "fileAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".rar", ".zip", ".tar", ".gz", ".7z", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt"]
            }));
            me.ue.ready(function () {
                me.UEditorIsReady = true;
            });

            //这块 组件的父容器关闭的时候 需要销毁编辑器 否则第二次渲染的时候会出问题 可根据具体布局调整
            var win = me.up('window');
            if (win && win.closeAction == "hide") {
                win.on('beforehide', function () {
                    me.onDestroy();
                });
            } else {
                var panel = me.up('panel');
                if (panel && panel.closeAction == "hide") {
                    panel.on('beforehide', function () {
                        me.onDestroy();
                    });
                }
            }
        } else {
            me.ue.setContent(me.getValue());
        }
    },
    setValue: function (value) {
        var me = this;
        if (!me.UEditorIsReady) {
            me.setRawValue(me.valueToRaw(value));
        } else {
            me.ue.insertHtml(value);
        }
        me.callParent(arguments);
        return me;
    },
    getRawValue: function () {
        var me = this;
        if (me.UEditorIsReady) {
            document.getElementById(me.getInputId()).innerText = me.ue.getContent();
        }
        var v = me.callParent();
        if (v === me.emptyText && me.valueContainsPlaceholder) {
            v = '';
        }
        return v;
    },
    onDestroy: function () {
        var me = this;
        if (me.rendered) {
            try {
                me.ue.destroy();
                delete me.ue;
            } catch (e) { }
        }
        me.callParent();
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 公共弹出框
 * history:  created by  苗建龙 20157/3/29 15:12:18 
 * ***********************************************/
Ext.define('Fm.ux.form.WindowField', {
    extend: 'Fm.ux.form.ComboGridField',
    alias: 'widget.windowfield',
    //弹出窗的title
    windowTitle: null,
    triggerCls: 'x-cis-window-trigger-default',
    winHeight: 500,
    winWidth: 800,
    onTriggerClick: function (e) {
        var me = this,
            win;

        win = me.getWindow();

        win.show();
    },
    //是否在窗口打开后自动选中值对应行
    autoSelect: true,
    getWindow: function () {
        var me = this,
            win,
            selModel;

        if (me.multiSelect) {
            selModel = {
                selType: "checkboxmodel",
                mode: "SIMPLE",
                allowDeselect: true
            };
        } else {
            selModel = {
                mode: "SINGLE",
                allowDeselect: false
            };
        }
        var pickerCfg = {
            selModel: selModel
        };
        if (!me.multiSelect) {
            pickerCfg['listeners'] = {
                itemdblclick: {
                    fn: me.onItemSelect
                },
                scope: me
            }
        }

        var grid = me.picker = me.grid = Ext.ComponentManager.create(Ext.apply(me.innerGrid, pickerCfg), "grid");

        win = me.win = Ext.create('Ext.window.Window', {
            pickerField: me,
            title: me.windowTitle || me.fieldLabel,
            height: me.winHeight,
            width: me.winWidth,
            modal: true,
            layout: 'fit',
            popWindow: 'is',
            items: [grid],
            buttons: ['->', {
                text: '选择',
                width: 70,
                listeners: {
                    click: {
                        fn: me.onItemSelect
                    },
                    scope: me
                }
            }, {
                text: '取消',
                width: 70,
                handler: function (btn) {
                    var win = btn.up('window[popWindow=is]');
                    win.close();
                }
            }],
            listeners: {
                'close': function () {
                    me.focus();
                },
                'show': me.onAfterShow,
                scope: me
            }
        });
        return win;
    },
    onAfterShow: function () {
        var me = this;
        if (!me.autoSelect) {
            return;
        }
        me.isChangeSelect = true;
        me.doAutoSelect();
    },
    onItemSelect: function () {
        var me = this,
            grid = me.grid,
            sel = grid.getSelectionModel(),
            records = sel.getSelection();

        me.setConvertValue(records);

        me.win.close();
        me.focus();
    },
    clearValue: function () {
        var me = this,
            picker = me.picker,
            sel;
        me.setValue(null);
        me.setRawValue('');
        me.lastMutatedValue = null;
    },
    getValue: function () {
        return this.value;
    },
    setValue: function (value) {
        var me = this,
            disTxt = '';
        me.value = me.valueToTrueValue(value);
        if (me.value) {
            if (Ext.isArray(me.value)) {
                disTxt = me.value.join(',');
            } else {
                disTxt = me.value.toString();
            }
        }
        me.setRawValue(disTxt);
        me.checkChange();
        me.refreshEmptyText();
        return me;
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 分页条 带页码大小下拉框 自定义格式等 用法同pagingtoolbar
 * history:  created by 苗建龙 2015/5/21 13:26:03 
 * ***********************************************/
Ext.define('Fm.ux.toolbar.CisPagingToolBar', {
    extend: 'Ext.toolbar.Paging',
    xtype: 'cispagingtoolbar',
    alternateClassName: ['Fm.ux.CisPagingToolBar', 'Fm.ux.toolbar.CisPagingToolBar'],
    cls: 'cis-pagingtoolbar-panel',
    padding: 0,
    displayInfo: true,
    displayMsg: '显示{0}-{1}&nbsp;共{2}条',
    emptyMsg: '没有数据',
    beforePageText: '第',
    afterPageText: '页&nbsp;共{0}页',
    firstText: '首页',
    prevText: '上一页',
    nextText: '下一页',
    lastText: '最后一页',
    refreshText: '刷新',
    /**
     * 每页大小列表
     */
    pageSizes: '10,50,100,500,1000,3000',
    getPagingItems: function () {
        var me = this,
            inputListeners = {
                scope: me,
                blur: me.onPagingBlur
            };

        //inputListeners[''] = me.onPagingKeyDown;
        inputListeners[Ext.supports.SpecialKeyDownRepeat ? 'keydown' : 'keypress'] = me.onPagingKeyDown;

        var _temp = me.pageSizes.split(',');
        var _data = [];
        for (var i = 0; i < _temp.length; i++) {
            if (_temp[i]) {
                _data[_data.length] = { text: _temp[i].toString(), value: _temp[i] };
            }
        }
        var pagess = Ext.create('Ext.data.Store', {
            fields: ['text', 'value'],
            data: _data
        });

        return [
        "每页",
        {
            itemId: 'pageSizes',
            xtype: "combo",
            store: pagess,
            queryMode: 'local',
            displayField: 'text',
            valueField: 'value',
            width: 65,
            editable: false,
            showClearTriggers: false,
            value: me.store.getPageSize(),
            listeners: {
                change: function (obj, v) {
                    me.store.setPageSize(v);
                    if (!me._notFireChange) {
                        me.moveFirst();
                    }
                }
            }
        },
        "条",
        '-', {
            itemId: 'first',
            tooltip: me.firstText,
            overflowText: me.firstText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-first',
            disabled: true,
            handler: me.moveFirst,
            scope: me
        }, {
            itemId: 'prev',
            tooltip: me.prevText,
            overflowText: me.prevText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
            disabled: true,
            handler: me.movePrevious,
            scope: me
        },
        '-',
        me.beforePageText,
        {
            xtype: 'numberfield',
            itemId: 'inputItem',
            name: 'inputItem',
            cls: Ext.baseCSSPrefix + 'tbar-page-number',
            allowDecimals: false,
            minValue: 1,
            hideTrigger: true,
            enableKeyEvents: true,
            keyNavEnabled: false,
            selectOnFocus: true,
            submitValue: false,
            // mark it as not a field so the form will not catch it when getting fields
            isFormField: false,
            width: me.inputItemWidth,
            margin: '-1 2 3 2',
            listeners: inputListeners
        },
        {
            xtype: 'tbtext',
            itemId: 'afterTextItem',
            text: Ext.String.format(me.afterPageText, 1)
        },
        '-',
        {
            itemId: 'next',
            tooltip: me.nextText,
            overflowText: me.nextText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
            disabled: true,
            handler: me.moveNext,
            scope: me
        }, {
            itemId: 'last',
            tooltip: me.lastText,
            overflowText: me.lastText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-last',
            disabled: true,
            handler: me.moveLast,
            scope: me
        },
        '-',
        {
            itemId: 'refresh',
            tooltip: me.refreshText,
            overflowText: me.refreshText,
            iconCls: Ext.baseCSSPrefix + 'tbar-loading',
            disabled: me.store.isLoading(),
            handler: me.doRefresh,
            scope: me
        }];
    },

    initComponent: function () {
        var me = this;
        me.store.on({
            'beforeUpdatePageInfo': {
                fn: me.beforeUpdatePageInfo,
                scope: me
            },
            'updatePageInfo': {
                fn: me.updatePageInfo,
                scope: me
            }
        });
        me.callParent();
    },
    beforeUpdatePageInfo: function () {
        var me = this;
        me.mask('正在更新分页信息...');
    },
    updatePageInfo: function () {
        var me = this;
        me.unmask();
        me.updateBarInfo();
    },

    // @private
    onLoad: function () {
        var me = this,
            pageData,
            currPage,
            pageCount,
            afterText,
            count,
            isEmpty,
            item,
            pageSizes;

        count = me.store.getCount();
        isEmpty = count === 0;
        if (!isEmpty) {
            pageData = me.getPageData();
            currPage = pageData.currentPage;
            pageCount = pageData.pageCount;

            // Check for invalid current page.
            if (currPage > pageCount) {
                //me.store.loadPage(pageCount);
                return;
            }

            afterText = Ext.String.format(me.afterPageText, isNaN(pageCount) ? 1 : pageCount);
        } else {
            currPage = 0;
            pageCount = 0;
            afterText = Ext.String.format(me.afterPageText, 0);
        }

        Ext.suspendLayouts();
        item = me.child('#afterTextItem');
        if (item) {
            item.setText(afterText);
        }
        item = me.getInputItem();
        if (item) {
            item.setDisabled(isEmpty).setValue(currPage);
        }
        item = me.child('#pageSizes');
        if (item) {
            me._notFireChange = true;
            item.setValue(me.store.getPageSize());
            me._notFireChange = false;
        }

        me.setChildDisabled('#first', currPage === 1 || isEmpty);
        me.setChildDisabled('#prev', currPage === 1 || isEmpty);
        me.setChildDisabled('#next', currPage === pageCount || isEmpty);
        me.setChildDisabled('#last', currPage === pageCount || isEmpty);
        me.setChildDisabled('#refresh', false);
        me.setChildDisabled('#go', isEmpty);
        me.updateInfo();
        Ext.resumeLayouts(true);

        if (!me.calledInternal) {
            me.fireEvent('change', me, pageData || me.emptyPageData);
        }
    },

    // @private
    onPagingBlur: function (e) {
        var me = this,
            inputItem = this.getInputItem(),
            pageData = me.getPageData(),
            pageNum;

        if (inputItem) {
            pageNum = me.readPageFromInput(pageData);
            if (pageNum !== false) {
                pageNum = Math.min(Math.max(1, pageNum), pageData.pageCount);
                if (pageNum !== pageData.currentPage && me.fireEvent('beforechange', me, pageNum) !== false) {
                    me.store.loadPage(pageNum);
                }
            }
            //curPage = this.getPageData().currentPage;
            //inputItem.setValue(curPage);
        }
    }
});

/* ***********************************************
 * author :  苗建龙
 * function: 表格分组头部添加全选功能
 * history:  created by 苗建龙 2015/8/8 15:56:45 
 * ***********************************************/
Ext.define('Fm.ux.grid.feature.Grouping', {
    extend: 'Ext.grid.feature.Grouping',
    alias: 'feature.cisgrouping',
    checkCls: Ext.baseCSSPrefix + 'grid-group-checked',
    groupHeaderTpl: '{columnName}: {name}',
    checkSelector: Ext.baseCSSPrefix + 'grid-group-checked-select',
    /**
     * 是否显示全选按钮
     */
    isShowCheck: true,
    
    init: function (grid) {
        var me = this;

        if (me.isShowCheck) {
            me.groupHeaderTpl = [
                '<i class="{checkedCls} ' + me.checkSelector +
                '" data-groupName-check="{name:htmlEncode}"></i>' +
                me.groupHeaderTpl
            ];
        }

        me.callParent(arguments);

        if (me.isShowCheck) {
            grid.on({
                'select': me.groupCheckedChange,
                'deselect': me.groupDeCheckedChange,
                scope: me
            });
            grid.getSelectionModel().on({
                'selectAll': me.groupCheckedAllChange,
                'deselectAll': me.groupDeCheckedAllChange,
                'updateGroupSelect': me.groupFristCheckedChange,
                scope: me
            });
        }
    },

    getGridStore: function () {
        return this.view.getStore() || this.view.selModel.store;
    },

    /**
     * 表格行全选事件  更新分组全选切换按钮的状态
     */
    groupFristCheckedChange: function () {
        var me = this,
        store = me.getGridStore(),
        groups = store.getGroups().items;

        for (var i = 0; i < groups.length; i++) {
            me.doUpdateGroupCheckedHead(groups[i].getGroupKey(), null);
        }
    },

    /**
     * 表格行选中事件  更新分组全选切换按钮的状态
     */
    groupCheckedChange: function (obj, record) {
        var me = this,
            groupName = me.getGridStore().getGrouper().getGroupString(record);

        me.doUpdateGroupCheckedHead(groupName, null);
    },
    /**
     * 表格行全选事件  更新分组全选切换按钮的状态
     */
    groupCheckedAllChange: function (obj) {
        var me = this,
        store = this.getGridStore(),
        groups = store.getGroups().items;

        for (var i = 0; i < groups.length; i++) {
            me.doUpdateGroupCheckedHead(groups[i].getGroupKey(), true);
        }
    },

    /**
     * 表格行取消选中事件  更新分组全选切换按钮的状态
     */
    groupDeCheckedChange: function (obj, record) {
        var me = this,
            groupName = me.getGridStore().getGrouper().getGroupString(record);

        me.doUpdateGroupCheckedHead(groupName, false);
    },

    /**
     * 表格取消全选事件  更新分组全选切换按钮的状态
     */
    groupDeCheckedAllChange: function (obj) {
        var me = this,
        store = this.getGridStore(),
        groups = store.getGroups().items;
        for (var i = 0; i < groups.length; i++) {
            me.doUpdateGroupCheckedHead(groups[i].getGroupKey(), false);
        }
    },

    /**
     * 更新分组全选切换按钮的状态
     */
    doUpdateGroupCheckedHead: function (groupName, checked) {
        var me = this,
            group,
            selection,
            checkedNode;

        if (checked === null) {
            checked = true;
            group = me.getGroup(groupName);
            selection = me.grid.getSelectionModel();

            Ext.each(group.items, function (item) {
                if (!selection.isSelected(item)) {
                    checked = false;
                    return false;
                }
            });
        }
        me.getCache()[groupName].isCheckedSub = checked;
        //me.getGroupedHeader(groupName);

        this.view.ownerGrid.getView().refreshView();
    },

    /**
     * 分组全选切换
     */
    doSetGroupChecked: function (groupName, checked) {
        var me = this;
        me.grid.mask('......');
        setTimeout(function () {
            Ext.suspendLayouts();
            var selection = me.grid.getSelectionModel();
            var start = selection.getSelection().length;
            selection.suspendChanges();
            if (checked) {
                selection.select(me.getGroup(groupName).items, true, true);
            } else {
                var delArr = me.getGroup(groupName).items;
                if (delArr.length > 100) {
                    //优化速度 解决卡死问题
                    var arr = Ext.Array.difference(selection.getSelection(), me.getGroup(groupName).items);
                    selection.deselectAll(true);
                    selection.select(arr, false, true);
                    me.groupFristCheckedChange();
                } else {
                    selection.deselect(me.getGroup(groupName).items, true);
                }
            }
            selection.resumeChanges();

            if (!selection.destroyed) {
                selection.maybeFireSelectionChange(selection.getSelection().length !== start);
            }

            me.doUpdateGroupCheckedHead(groupName, checked);
            Ext.resumeLayouts(true);
            me.grid.unmask();
        }, 10);
    },

    /**
     * Toggle between expanded/collapsed state when clicking on
     * the group.
     * @private
     */
    onGroupClick: function (view, rowElement, groupName, e) {
        var me = this,
            metaGroupCache = me.getCache(),
            target;

        if (me.isShowCheck) {
            target = Ext.get(e.target);
            if (target.hasCls(me.checkSelector)) {
                me.doSetGroupChecked(groupName, !metaGroupCache[groupName].isCheckedSub);
                //metaGroupCache[groupName].isCheckedSub = !metaGroupCache[groupName].isCheckedSub;
                e.stopEvent();
            } else {
                me.callParent(arguments);
            }
        } else {
            me.callParent(arguments);
        }
    },

    /**
     * 初始化全选切换按钮的样式
     */
    setupRowData: function (record, idx, rowValues) {
        var me = this,
            data = me.refreshData,
            groupRenderInfo = me.groupRenderInfo;

        this.callParent(arguments);

        if (data.doGrouping) {
            if (rowValues.isFirstRow) {
                var temp = me.getCache()[rowValues.groupName];
                if (temp.isCheckedSub) {
                    if (rowValues.metaGroupCache) {
                        rowValues.metaGroupCache.checkedCls = me.checkCls;
                    }
                    if (groupRenderInfo) {
                        groupRenderInfo.checkedCls = me.checkCls;
                    }
                } else {
                    if (rowValues.metaGroupCache) {
                        rowValues.metaGroupCache.checkedCls = me.checkCls + '-no';
                    }
                    if (groupRenderInfo) {
                        groupRenderInfo.checkedCls = me.checkCls + '-no';
                    }
                }
            }
        }
    }
});

/* ***********************************************
 * author :  苗建龙
 * function: 自动选中插件
        plugins: [{
            ptype: 'fmgridautoselector',
            bindCheckedField: 'checked'
        }]
 * history:  created by 苗建龙 2015/7/2 15:56:45 
 * ***********************************************/
Ext.define('Fm.ux.grid.plugin.AutoSelector', {
    extend: 'Ext.plugin.Abstract',
    alias: [
        'plugin.fmgridautoselector'
    ],
    config: {
        store: null,
        bindCheckedField: null
    },

    init: function (grid) {
        //<debug>
        if (!grid.isXType('tablepanel')) {
            Ext.raise('The fmgridautoselector plugin is designed only for grids and trees');
        }
        //</debug>

        var me = this;

        me.grid = grid;

        me.watchGrid();

        grid.on({
            reconfigure: me.watchGrid,
            scope: me
        });
    },

    destroy: function () {
        this.setStore(null);
        this.grid = null;

        this.callParent();
    },

    ensureSelection: function () {
        var me = this,
            grid = me.grid,
            store = grid.getStore(),
            selection;
        if (!me.bindCheckedField) {
            return;
        }
        if (store.getCount()) {
            var temp = [];
            Ext.Array.each(store.getData().items, function (item) {
                if (item.get(me.bindCheckedField)) {
                    temp.push(item);
                }
            });

            if (temp && temp.length) {
                var sel = grid.getSelectionModel();
                Ext.suspendLayouts();
                sel.suspendChanges();
                sel.select(temp, true, true);
                sel.resumeChanges();
                sel.fireEvent('updateGroupSelect');
                Ext.resumeLayouts(true);
            }
        }
    },

    watchGrid: function () {
        this.setStore(this.grid.getStore());
        this.ensureSelection();
    },

    updateStore: function (store) {
        var me = this;

        Ext.destroy(me.storeListeners);

        me.storeListeners = store && store.on({
            load: me.ensureSelection,

            destroyable: true,
            scope: me
        });
    }
});

/* ***********************************************
 * author :  苗建龙
 * function: 表格行内面板
 * history:  created by 苗建龙 2015/7/2 15:56:45 
 * ***********************************************/
Ext.define('Fm.ux.grid.plugin.CisRowExpander', {
    extend: 'Ext.plugin.Abstract',
    lockableScope: 'normal',
    requires: ['Ext.grid.feature.RowBody'],
    alias: 'plugin.cisrowexpander',
    columnWidth: 24,
    mixins: {
        observable: 'Ext.util.Observable'
    },
    /**
     * 是否展开第一行
     */
    autoExpandFirstRow: true,
    /**
     * 是否只能展开一行 为true时 行没有前面的 + 号
     */
    singleExpand: true,
    isRowExpander: true,
    rowBodyTpl: null,
    lockedTpl: null,
    /**
     * 是否Enter键展开
     */
    expandOnEnter: false,
    /**
     * 是否单击行展开
     */
    expandOnClick: true,
    /**
     * 是否双击行折叠
     */
    closeOnDblClick: true,
    /**
     * 是否选中行展开
     */
    selectRowOnExpand: false,
    headerWidth: 24,
    bodyBefore: false,
    hiddenColumn: false,
    rowBodyTrSelector: '.' + Ext.baseCSSPrefix + 'grid-rowbody-tr',
    rowBodyHiddenCls: Ext.baseCSSPrefix + 'grid-row-body-hidden',
    rowCollapsedCls: Ext.baseCSSPrefix + 'grid-row-collapsed',
    swallowBodyEvents: true,
    addCollapsedCls: {
        fn: function (out, values, parent) {
            var me = this.rowExpander;
            if (!me.recordsExpanded[values.record.internalId]) {
                values.itemClasses.push(me.rowCollapsedCls);
            }
            this.nextTpl.applyOut(values, out, parent);
        },
        syncRowHeights: function (lockedItem, normalItem) {
            this.rowExpander.syncRowHeights(lockedItem, normalItem);
        },
        priority: 20000
    },
    constructor: function (config) {
        Ext.log.warn('表格插件 Fm.ux.grid.plugin.CisRowExpander 不建议继续使用，替代：Fm.ux.grid.plugin.CisRowWidget');
        this.callParent(arguments);
        this.mixins.observable.constructor.call(this);
        this.fitCmpWidth = Ext.Function.createDelayed(this.fitCmpWidth, 1);
    },
    setCmp: function (grid) {
        var me = this,
        features;
        this.callParent(arguments);
        this.recordsExpanded = {};
        this.preventsExpanding = {};
        this.bodyContent = {};
        if (!this.rowBodyTpl) {
            this.rowBodyTpl = "";
        }
        if (!Ext.isEmpty(this.rowBodyTpl) && (this.loader || this.component)) {
            this.cmpBodyTpl = (this.rowBodyTpl instanceof Ext.XTemplate) ? this.rowBodyTpl : Ext.create('Ext.XTemplate', this.rowBodyTpl);
            this.rowBodyTpl = "";
        }
        this.rowBodyTpl = (this.rowBodyTpl instanceof Ext.XTemplate) ? this.rowBodyTpl : Ext.create('Ext.XTemplate', this.rowBodyTpl);
        features = me.getFeatureConfig(grid);
        if (grid.features) {
            grid.features = Ext.Array.push(features, grid.features);
        } else {
            grid.features = features;
        }
        this.componentsCache = [];
        this.outerComponentsCache = [];
        if (this.component && this.singleExpand === false) {
            this.componentCfg = this.component;
            delete this.component;
        }
        if (this.component && !this.component.initialConfig) {
            this.component.monitorResize = true;
            this.componentCfg = this.component;
            this.component = Ext.ComponentManager.create(Ext.isFunction(this.component) ? this.component.call({
                expander: this
            }) : this.component, "panel");
            this.component.on({
                render: function () {
                    var comp = this;
                    me.swallowRow(comp);
                    Ext.each(comp.query('textfield,textarea'), function (tempText) {
                        tempText.on({
                            focus: function (a, b, c, d) {
                                grid.getStore().suspendEvents();
                            },
                            blur: function (a) {
                                grid.getStore().resumeEvents();
                            }
                        });
                    });
                }
            })
        }
    },
    getFeatureConfig: function (grid) {
        var me = this,
        features = [],
        featuresCfg = {
            ftype: 'rowbody',
            rowExpander: me,
            bodyBefore: me.bodyBefore,
            recordsExpanded: this.recordsExpanded,
            rowBodyHiddenCls: this.rowBodyHiddenCls,
            rowCollapsedCls: this.rowCollapsedCls,
            setupRowData: this.getRowBodyFeatureData,
            setup: this.setup,
            expander: this
        };
        features.push(Ext.apply({
            lockableScope: 'normal',
            getRowBodyContents: me.getRowBodyContentsFn(me.rowBodyTpl)
        },
        featuresCfg));
        if (grid.enableLocking) {
            features.push(Ext.apply({
                lockableScope: 'locked',
                getRowBodyContents: me.lockedTpl ? me.getRowBodyContentsFn(me.lockedTpl) : function () {
                    return '';
                }
            },
            featuresCfg));
        }
        return features;
    },
    getRowBodyContentsFn: function (rowBodyTpl) {
        var me = this;
        return function (rowValues) {
            rowBodyTpl.owner = me;
            return rowBodyTpl.applyTemplate(rowValues.record.getData()) || this.rowExpander.bodyContent[rowValues.record.internalId];
        };
    },
    getExpanded: function () {
        var store = this.grid.store,
        expandedRecords = [];
        (store.store || store).each(function (record, index) {
            if (this.recordsExpanded[record.internalId]) {
                expandedRecords.push(record);
            }
        },
        this);
        return expandedRecords;
    },
    init: function (grid) {
        if (grid.lockable) {
            grid = grid.normalGrid;
        }
        var me = this,
        ownerLockable = grid.ownerLockable,
        lockedView;
        this.callParent(arguments);
        this.grid = grid;
        me.view = grid.getView();
        me.bindView(me.view);
        me.view.addRowTpl(me.addCollapsedCls).rowExpander = me;
        if (ownerLockable) {
            me.addExpander(ownerLockable.lockedGrid.headerCt.items.getCount() ? ownerLockable.lockedGrid : grid);
            lockedView = ownerLockable.lockedGrid.getView();
            me.bindView(lockedView);
            lockedView.addRowTpl(me.addCollapsedCls).rowExpander = me;
            ownerLockable.syncRowHeight = true;
            ownerLockable.mon(ownerLockable, {
                processcolumns: me.onLockableProcessColumns,
                lockcolumn: me.onColumnLock,
                unlockcolumn: me.onColumnUnlock,
                scope: me
            });
            me.viewListeners = view.on({
                itemadd: Ext.Function.createAnimationFrame(ownerLockable.syncRowHeights, ownerLockable)
            });
        } else {
            me.addExpander(grid);
            grid.on('beforereconfigure', me.beforeReconfigure, me);
        }
        //grid.headerCt.on("columnresize", this.updateComponentsWidth, this, {
        //    delay: 20,
        //    buffer: 20
        //});
        grid.headerCt.on("columnhide", this.updateComponentsWidth, this, {
            delay: 20,
            buffer: 20
        });
        grid.headerCt.on("columnshow", this.updateComponentsWidth, this, {
            delay: 20,
            buffer: 20
        });
        me.expands = [];
    },
    updateComponentsWidth: function () {
        var i, grid = this.grid,
            store = (grid.store.store || grid.store),
        body, len = this.componentsCache.length,
        item;
        try {
            if (this.component && this.component.record && this.recordsExpanded[this.component.record.internalId]) {
                var _node = Ext.get(grid.view.getNode(store.getByInternalId(this.component.record.internalId)));
                if (_node && _node.down) {
                    body = _node.down("div.x-grid-rowbody");
                    this.component.setWidth(body.getWidth() - body.getPadding("lr") - (this.scrollOffset || 0));
                }
            }
            if (this.componentsCache && len > 0) {
                for (i = 0; i < len; i++) {
                    item = this.componentsCache[i];
                    if (this.recordsExpanded[item.id]) {
                        body = Ext.get(grid.view.getNode(store.getByInternalId(item.id))).down("div.x-grid-rowbody");
                        item.cmp.setWidth(body.getWidth() - body.getPadding("lr") - (this.scrollOffset || 0));
                    }
                }
            }
        } catch (e) { }
    },
    beforeReconfigure: function (grid, store, columns, oldStore, oldColumns) {
        var me = this;
        if (me.viewListeners) {
            me.viewListeners.destroy();
        }
        if (columns) {
            me.expanderColumn = new Ext.grid.Column(me.getHeaderConfig());
            columns.unshift(me.expanderColumn);
        }
    },
    onLockableProcessColumns: function (lockable, lockedHeaders, normalHeaders) {
        this.addExpander(lockedHeaders.length ? lockable.lockedGrid : lockable.normalGrid);
    },
    addExpander: function (expanderGrid) {
        var me = this,
        expanderHeader = me.getHeaderConfig();
        //单击展开为true时 不添加展开列
        if (!me.expandOnClick) {
            if (expanderGrid.isLocked && expanderGrid.ownerLockable.shrinkWrapLocked) {
                expanderGrid.width += expanderHeader.width;
            }
            me.expanderColumn = expanderGrid.headerCt.insert(0, expanderHeader);
            expanderGrid.getSelectionModel().injectCheckbox = 1;
        }
    },
    getRowBodyFeatureData: function (record, idx, rowValues) {
        var me = this;
        me.self.prototype.setupRowData.apply(me, arguments);
        rowValues.rowBody = me.getRowBodyContents(rowValues);
        rowValues.rowBodyCls = me.recordsExpanded[record.internalId] ? '' : me.rowBodyHiddenCls;
    },
    setup: function (rows, rowValues) {
        var me = this,
        lockable = me.grid.ownerLockable;
        me.self.prototype.setup.apply(me, arguments);
        if (lockable && Ext.Array.indexOf(me.grid.columnManager.getColumns(), me.rowExpander.expanderColumn) !== -1) {
            rowValues.rowBodyColspan -= 1;
        }
    },
    bindView: function (view) {
        view.stopEventFn = this.stopEventFn;
        view.on("beforerefresh",
        function () {
            this.preventsExpanding = {};
        },
        this);
        if (this.expandOnEnter) {
            view.on('itemkeydown', this.onKeyDown, this);
        }
        if (this.closeOnDblClick) {
            view.on('itemdblclick', this.onDblClick, this);
        }
        if (this.expandOnClick) {
            view.on('itemclick', this.onClick, this);
        }
        if (this.autoExpandFirstRow) {
            var me = this;
            view.ownerCt.on('expandfirstrow', this.onExpandFirstRow, this);
            view.on('refresh', function () {
                this.fireEvent('expandfirstrow', this)
            }, view.ownerCt);
        }
        view.on('itemmousedown',
        function (view, record, item, index, e) {
            return !e.getTarget('div.x-grid-rowbody', view.el);
        },
        this);
        if ((this.componentCfg && this.singleExpand === false) || this.loader) {
            view.on("beforerefresh", this.mayRemoveComponents, this);
            view.on("beforeitemupdate", this.mayRemoveComponent, this);
            view.on("beforeitemremove", this.removeComponent, this);
            view.on("refresh", this.restoreComponents, this);
            view.on("itemupdate", this.restoreSingleComponent, this);
            view.on("itemadd", this.onExpandMemRows, this);
        }
        if (this.component) {
            view.on("beforerefresh", this.moveComponent, this);
            view.on("beforeitemupdate", this.moveComponent, this);
            view.on("beforeitemremove", this.moveComponent, this);
            view.on("refresh", this.restoreComponent, this);
            view.on("itemupdate", this.restoreComponent, this);

            view.on("itemremove", this.moveComponent, this);
            view.on("itemadd", this.restoreComponent, this);
            view.ownerCt.on('show', this.restoreComponent, this);
        }
    },
    moveComponent: function () {
        if (!this.componentInsideGrid) {
            return;
        }
        var ce = this.component.getEl(),
        //el = Ext.net.ResourceMgr.getAspForm() || Ext.getBody();
        el = Ext.getBody();
        ce.addCls("x-hidden");
        el.dom.appendChild(ce.dom);
        this.componentInsideGrid = false;
    },
    removeComponent: function (view, record, rowIndex) {
        for (var i = 0,
        l = this.componentsCache.length; i < l; i++) {
            if (this.componentsCache[i].id == record.internalId) {
                try {
                    var cmp = this.componentsCache[i].cmp;
                    cmp.destroy();
                    Ext.Array.remove(this.componentsCache, this.componentsCache[i]);
                } catch (ex) { }
                break;
            }
        }
    },
    mayRemoveComponent: function (view, record, rowIndex) {
        if (this.invalidateComponentsOnRefresh) {
            this.removeComponents(view, record, rowIndex);
            return;
        }
        var item, ce, elTo;
        for (var i = 0,
        l = this.componentsCache.length; i < l; i++) {
            item = this.componentsCache[i];
            if (item.id == record.internalId) {
                ce = item.cmp.getEl();
                elTo = Ext.getBody();
                ce.addCls("x-hidden");
                elTo.dom.appendChild(ce.dom);
                this.outerComponentsCache.push(item);
                Ext.Array.remove(this.componentsCache, item);
                break;
            }
        }
    },
    mayRemoveComponents: function () {
        if (this.invalidateComponentsOnRefresh) {
            this.removeComponents();
            return;
        }
        var cmp, ce, elTo = Ext.getBody();
        for (var i = 0,
        l = this.componentsCache.length; i < l; i++) {
            cmp = this.componentsCache[i].cmp;
            ce = cmp.getEl();
            ce.addCls("x-hidden");
            elTo.dom.appendChild(ce.dom);
        }
        this.outerComponentsCache = this.componentsCache;
        this.componentsCache = [];
    },
    removeComponents: function (outer) {
        for (var i = 0,
        l = this.componentsCache.length; i < l; i++) {
            try {
                var cmp = this.componentsCache[i].cmp;
                cmp.destroy();
            } catch (ex) { }
        }
        this.componentsCache = [];
        if (outer && this.outerComponentsCache) {
            for (var i = 0,
            l = this.outerComponentsCache.length; i < l; i++) {
                try {
                    var cmp = this.outerComponentsCache[i].cmp;
                    cmp.destroy();
                } catch (ex) { }
            }
            this.outerComponentsCache = [];
        }
    },
    restoreComponent: function () {
        if (this.component.rendered === false) {
            return;
        }
        var grid = this.grid;
        Ext.each(grid.getView().getViewRange(),
        function (record, i) {
            if (record.isCollapsedPlaceholder) {
                return;
            }
            if (this.recordsExpanded[record.internalId]) {
                var rowNode = grid.view.getNode(record, false),
                row = Ext.get(rowNode),
                body = row.down("div.x-grid-rowbody"),
                rowCmp = this.getComponent(record, body);
                body.appendChild(this.component.getEl());
                this.component.removeCls("x-hidden");
                this.componentInsideGrid = true;
                return false;
            }
        },
        this);
        grid.view.refreshSize(true);
        this.fitCmpWidth(this.component);
    },
    onRowCmpLoad: function (loader, response, options) {
        var expander = loader.paramsFnScope.expander,
        grid = expander.grid,
        target = loader.getTarget();
        grid.view.refreshSize(true);
        expander.fitCmpWidth(target);
    },
    createComponent: function (record, body) {
        var rowCmp, needContainer, scope, box, loader;
        if (this.loader) {
            needContainer = !(this.loader.renderer == "html" || this.loader.renderer == "data");
            scope = {
                record: record,
                expander: this,
                el: body,
                grid: this.grid
            };
            loader = Ext.isFunction(this.loader) ? this.loader.call(scope) : Ext.clone(this.loader);
            loader.paramsFnScope = scope;
            loader.success = this.onRowCmpLoad;
            rowCmp = Ext.create(needContainer ? "Ext.container.Container" : "Ext.Component", {
                loader: loader,
                layout: "anchor",
                defaults: {
                    anchor: "100%"
                },
                tpl: !Ext.isEmpty(this.cmpBodyTpl) ? ((this.cmpBodyTpl instanceof Ext.XTemplate) ? this.cmpBodyTpl : Ext.create('Ext.XTemplate', this.cmpBodyTpl)) : undefined
            });
        } else {
            rowCmp = Ext.ComponentManager.create(Ext.isFunction(this.componentCfg) ? this.componentCfg.call({
                record: record,
                expander: this
            }) : Ext.clone(this.componentCfg), "panel");
        }
        if (this.componentMargin) {
            rowCmp.margin = this.componentMargin;
        }
        rowCmp.ownerCt = this.grid;
        rowCmp.record = record;
        rowCmp.width = body.getWidth() - (this.scrollOffset || 0);
        rowCmp.render(body);
        rowCmp.addCls("x-row-expander-control");
        this.componentsCache.push({
            id: record.internalId,
            cmp: rowCmp
        });
        return rowCmp;
    },
    restoreSingleComponent: function (record, index, node) {
        var grid = this.grid;
        if (record.isCollapsedPlaceholder) {
            return;
        }
        if (this.recordsExpanded[record.internalId]) {
            var rowNode = grid.view.getNode(record, false),
            row = Ext.get(rowNode),
            nextBd = row.down(this.rowBodyTrSelector),
            body = row.down("div.x-grid-rowbody"),
            rowCmp = this.getComponent(record, body);
            if (!rowCmp) {
                rowCmp = this.createComponent(record, body);
            }
            grid.view.refreshSize(true);
            this.fitCmpWidth(rowCmp);
        }
    },
    restoreComponents: function () {
        var grid = this.grid,
        cmps = [];
        Ext.each(grid.getView().getViewRange(),
        function (record, i) {
            if (record.isCollapsedPlaceholder) {
                return;
            }
            if (this.recordsExpanded[record.internalId]) {
                var rowNode = grid.view.getNode(record, false),
                row = Ext.get(rowNode),
                nextBd = row.down(this.rowBodyTrSelector),
                body = row.down("div.x-grid-rowbody"),
                rowCmp = this.getComponent(record, body);
                if (!rowCmp) {
                    rowCmp = this.createComponent(record, body);
                }
                cmps.push(rowCmp);
            }
        },
        this);
        this.removeOuterOrphans();
        if (grid.view.viewReady) {
            grid.view.refreshSize(true);
        }
        Ext.each(cmps,
        function (cmp) {
            this.fitCmpWidth(cmp);
        },
        this);
    },
    removeOuterOrphans: function () {
        if (this.outerComponentsCache && this.outerComponentsCache.length > 0) {
            var len = this.outerComponentsCache.length,
            store = (this.grid.store.store || this.grid.store),
            records = store.data.items,
            len2 = records.length,
            r, found, i = 0,
            item;
            while (i < len) {
                item = this.outerComponentsCache[i];
                found = false;
                for (r = 0; r < len2; r++) {
                    if (records[r].internalId == item.id) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    try {
                        item.cmp.destroy();
                    } catch (ex) { }
                    Ext.Array.remove(this.outerComponentsCache, item);
                    len--;
                } else {
                    i++;
                }
            }
        }
    },
    swallowRow: function (comp) {
        if (this.swallowBodyEvents) {
            comp.getEl().swallowEvent(['click', 'mousedown', 'mousemove', 'mouseup', 'dblclick', 'contextmenu', 'mouseover', 'mouseout'], false);
        }
    },
    onKeyDown: function (view, record, row, rowIdx, e) {
        if (e.getKey() === e.ENTER) {
            var ds = (view.store.store || view.store),
            sels = view.getSelectionModel().getSelection(),
            ln = sels.length,
            i = 0;
            for (; i < ln; i++) {
                if (!this.preventsExpanding[sels[i].internalId]) {
                    rowIdx = ds.indexOf(sels[i]);
                    this.toggleRow(rowIdx, sels[i]);
                }
            }
        }
    },
    beforeExpand: function (record, body, rowNode, rowIndex) {
        if (this.fireEvent("beforeexpand", this, record, body, rowNode, rowIndex) !== false) {
            if (this.singleExpand || this.component) {
                this.collapseAll();
            }
            return true;
        } else {
            return false;
        }
    },
    expandAll: function () {
        if (this.singleExpand || this.component) {
            return;
        }
        var i = 0,
        records = this.view.getViewRange(),
        store = (this.grid.store.store || this.grid.store),
        len = records.length;
        for (i; i < len; i++) {
            this.toggleRow(store.indexOf(records[i]), records[i], true);
        }
    },
    collapseAll: function () {
        try {
            var i = 0,
            records = this.view.getViewRange(),
            store = (this.grid.store.store || this.grid.store),
            len = records.length;
            for (i; i < len; i++) {
                this.toggleRow(store.indexOf(records[i]), records[i], false);
            }
            this.recordsExpanded = {};
            this.grid.view.rowBodyFeature.recordsExpanded = this.recordsExpanded;
        } catch (e) {
        }
    },
    collapseRow: function (row) {
        this.toggleRow(row, this.view.getRecord(this.view.getNode(row)), false);
    },
    expandRow: function (row) {
        try {
            if (!Ext.get(row.offsetParent).hasCls(this.rowCollapsedCls)) {
                return;
            }
            this.toggleRow(row, this.view.getRecord(this.view.getNode(row)), true);
        } catch (e) { }
    },
    toggleRow: function (rowIdx, record, state) {
        if (record.isCollapsedPlaceholder) {
            return;
        }
        var me = this,
        view = this.view,
        bufferedRenderer = view.bufferedRenderer,
        scroller = view.getScrollable(),
        fireView = view,
        rowNode = this.view.getNode(record, false),
        normalRow = Ext.get(rowNode),
        lockedRow;
        try {
            normalRow.down(this.rowBodyTrSelector)
        } catch (e) {
            return;
        }

        var nextBd = normalRow.down(this.rowBodyTrSelector),
        body = normalRow.down("div.x-grid-rowbody"),
        hasState = Ext.isDefined(state),
        wasCollapsed = normalRow.hasCls(me.rowCollapsedCls),
        addOrRemoveCls = wasCollapsed ? 'removeCls' : 'addCls',
        grid = this.grid,
        rowCmp,
        needContainer,
        rowSpan = wasCollapsed ? 2 : 1,
        ownerLockable = me.grid.ownerLockable,
        expanderCell;
        rowIdx = (grid.store.store || grid.store).indexOf(record);
        Ext.suspendLayouts();
        if ((!hasState) || (hasState && state === true)) {
            if (this.beforeExpand(record, nextBd, rowNode, rowIdx)) {
                normalRow.removeCls(this.rowCollapsedCls);
                nextBd.removeCls(this.rowBodyHiddenCls);
                this.recordsExpanded[record.internalId] = true;
                if (this.component) {
                    if (this.recreateComponent) {
                        this.component.destroy();
                        this.component = Ext.ComponentManager.create(Ext.isFunction(this.componentCfg) ? this.componentCfg.call({
                            record: record,
                            expander: this
                        }) : this.componentCfg, "panel");
                    }
                    if (this.component.rendered) {
                        body.appendChild(this.component.getEl());
                        this.component.show();
                        this.component.setWidth(body.getWidth() - (this.scrollOffset || 0));
                    } else {
                        this.component.width = body.getWidth() - (this.scrollOffset || 0);
                        this.component.render(body);
                    }
                    this.component.addCls("x-row-expander-control");
                    this.component.removeCls("x-hidden");
                    this.componentInsideGrid = true;
                    rowCmp = this.component;
                } else if (this.componentCfg || this.loader) {
                    rowCmp = this.getComponent(record, body);
                    if (!rowCmp) {
                        rowCmp = this.createComponent(record, body);
                    } else {
                        rowCmp.show();
                    }
                }
                if (rowCmp) {
                    rowCmp.record = record;
                    this.fitCmpWidth(rowCmp);
                }
                this.expands.push(record);

                //var _height = rowCmp.getHeight();
                //if (_height > 5) {
                //    grid.getView().setScrollY(rowIdx * 23);
                //}

                this.fireEvent('expand', this, record, rowCmp, nextBd, rowNode, rowIdx);
            }
        } else if ((!normalRow.hasCls(this.rowCollapsedCls) && !hasState) || (hasState && state === false && !normalRow.hasCls(this.rowCollapsedCls))) {
            if (this.fireEvent("beforecollapse", this, record, nextBd, rowNode, rowIdx) !== false) {
                if (this.component && this.component.rendered) {
                    this.component.hide();
                } else if (this.componentCfg || this.loader) {
                    rowCmp = this.getComponent(record, body);
                    if (rowCmp && rowCmp.rendered) {
                        rowCmp.hide();
                    }
                }
                normalRow.addCls(this.rowCollapsedCls);
                nextBd.addCls(this.rowBodyHiddenCls);
                this.recordsExpanded[record.internalId] = false;
                Ext.Array.remove(this.expands, record);
                this.fireEvent('collapse', this, record, rowCmp, nextBd, rowNode, rowIdx);
            }
        }
        if (me.grid.ownerLockable) {
            fireView = ownerLockable.getView();
            if (ownerLockable.lockedGrid.isVisible()) {
                view = ownerLockable.view.lockedGrid.view;
                lockedRow = Ext.fly(view.getNode(rowIdx));
                if (lockedRow) {
                    lockedRow[addOrRemoveCls](me.rowCollapsedCls);
                    nextBd = lockedRow.down(me.rowBodyTrSelector, true);
                    Ext.fly(nextBd)[addOrRemoveCls](me.rowBodyHiddenCls);
                }
            }
        }
        if (me.expanderColumn) {
            expanderCell = Ext.fly(view.getRow(rowIdx)).down(me.expanderColumn.getCellSelector(), true);
            if (expanderCell) {
                expanderCell.rowSpan = rowSpan;
            }
        }
        fireView.fireEvent(wasCollapsed ? 'expandbody' : 'collapsebody', rowNode, record, nextBd);
        if (view.getSizeModel().height.shrinkWrap || ownerLockable) {
            view.refreshSize(true);
        }
        if (scroller) {
            if (bufferedRenderer) {
                bufferedRenderer.refreshSize();
            } else {
                scroller.refresh(true);
            }
        }
        Ext.resumeLayouts(true);
    },
    onDblClick: function (view, record, row, rowIdx, e) {
        if (!this.preventsExpanding[record.internalId] && !e.getTarget(this.rowBodyTrSelector, view.el)) {
            if (this.isExpanded(row)) {
                this.collapseRow(row);
            }
        }
    },
    onClick: function (view, record, row, rowIdx, e) {
        var me = this,
            grid = me.grid,
            selectChx;

        if (grid.getSelectionModel) {
            selectChx = grid.getSelectionModel();
        }
        //SelectionModel为checkOnly时点击选择框不执行
        if (selectChx && selectChx.checkOnly && e.position.colIdx === selectChx.injectCheckbox) {
            return false;
        }
        if (this.isExpanded(row)) {
            return;
        }
        if (!this.preventsExpanding[record.internalId] && !e.getTarget(this.rowBodyTrSelector, view.el)) {
            this.collapseAll();
            this.toggleRow(rowIdx, record);
        }
    },
    /**
     * 展开大数据时 动态缓存行   解决bufferedRenderer 时的bug
     */
    onExpandMemRows: function (grid) {
        var me = this,
            view = me.grid.view,
            row;

        for (var i = 0; i < this.expands.length; i++) {
            var rowNode = view.getNode(this.expands[i], false);
            row = Ext.get(rowNode);
            if (row) {
                setTimeout(function () {
                    me.expandRow(row);
                }, 100);
            }
        }
    },
    onExpandFirstRow: function (grid) {
        var me = this,
            view = grid.view,
            row = view.getRow(0),
            record = grid.getStore().getAt(0);
        if (!row) {
            return;
        }
        me.recordsExpanded[record.internalId] = true;
        //me.expandRow(row);
        me.collapseAll();
        setTimeout(function () {
            if (Ext.get(row)) {
                try {
                    me.expandRow(row);
                } catch (e) { }
            }
            //var record = grid.getStore().getAt(0);
            //view.onRowSelect(record);
            //row.click();
        }, 100);
    },
    renderer: Ext.emptyFn,
    syncRowHeights: function (lockedItem, normalItem) {
        var me = this,
        lockedBd = Ext.fly(lockedItem).down(me.rowBodyTrSelector),
        normalBd = Ext.fly(normalItem).down(me.rowBodyTrSelector),
        lockedHeight,
        normalHeight;
        if (normalBd.isVisible()) {
            if ((lockedHeight = lockedBd.getHeight()) !== (normalHeight = normalBd.getHeight())) {
                if (lockedHeight > normalHeight) {
                    normalBd.setHeight(lockedHeight);
                } else {
                    lockedBd.setHeight(normalHeight);
                }
            }
        } else {
            lockedBd.dom.style.height = normalBd.dom.style.height = '';
        }
    },
    onColumnUnlock: function (lockable, column) {
        var me = this,
        lockedColumns;
        lockable = me.grid.ownerLockable;
        lockedColumns = lockable.lockedGrid.visibleColumnManager.getColumns();
        if (lockedColumns.length === 1) {
            if (lockedColumns[0] === me.expanderColumn) {
                lockable.unlock(me.expanderColumn);
                me.grid = lockable.normalGrid;
            } else {
                lockable.lock(me.expanderColumn, 0);
            }
        }
    },
    onColumnLock: function (lockable, column) {
        var me = this,
        lockedColumns, lockedGrid;
        lockable = me.grid.ownerLockable;
        lockedColumns = lockable.lockedGrid.visibleColumnManager.getColumns();
        if (lockedColumns.length === 1) {
            me.grid = lockedGrid = lockable.lockedGrid;
            lockedGrid.headerCt.insert(0, me.expanderColumn);
        }
    },
    getHeaderConfig: function () {
        var me = this,
        lockable = me.grid.ownerLockable;
        return {
            width: me.headerWidth,
            isExpanderColumn: true,
            lockable: false,
            sortable: false,
            resizable: false,
            draggable: false,
            hideable: false,
            menuDisabled: true,
            hidden: this.hiddenColumn,
            tdCls: Ext.baseCSSPrefix + 'grid-cell-special',
            innerCls: Ext.baseCSSPrefix + 'grid-cell-inner-row-expander',
            preinitScope: me,
            preinitFn: function (column) {
                this.expanderColumn = column;
            },
            renderer: function (value, metadata, record) {
                var res = me.renderer.apply(this, arguments);
                if (res === false) {
                    res = "&#160;";
                    me.preventsExpanding[record.internalId] = true;
                } else if (res === true) {
                    res = null;
                }
                if (me.recordsExpanded[record.internalId]) {
                    metadata.tdAttr += ' rowspan="2"';
                }
                return res ? res : ('<div class="' + Ext.baseCSSPrefix + 'grid-row-expander" role="presentation"></div>');
            },
            processEvent: function (type, view, cell, rowIndex, cellIndex, e, record) {
                if (e.getTarget('.' + Ext.baseCSSPrefix + 'grid-row-expander')) {
                    if (type === "click") {
                        me.toggleRow(rowIndex, record);
                        return me.selectRowOnExpand;
                    }
                }
            },
            isLocked: function () {
                return lockable && (lockable.lockedGrid.isVisible() || this.locked);
            },
            editRenderer: function () {
                return '&#160;';
            }
        };
    },
    isCollapsed: function (row) {
        if (typeof row === "number") {
            row = this.view.getNode(row);
        }
        return Ext.fly(row).hasCls(this.rowCollapsedCls);
    },
    isExpanded: function (row) {
        if (typeof row === "number") {
            row = this.view.getNode(row);
        }
        return !Ext.fly(row).hasCls(this.rowCollapsedCls);
    },
    getComponent: function (record, body) {
        var i, l, item, cmp;
        if (this.componentsCache) {
            for (i = 0, l = this.componentsCache.length; i < l; i++) {
                item = this.componentsCache[i];
                if (item.id == record.internalId) {
                    if (body) {
                        item.cmp.setWidth(body.getWidth() - (this.scrollOffset || 0));
                    }
                    return item.cmp;
                }
            }
        }
        if (this.outerComponentsCache) {
            for (i = 0, l = this.outerComponentsCache.length; i < l; i++) {
                if (this.outerComponentsCache[i].id == record.internalId) {
                    item = this.outerComponentsCache[i];
                    cmp = item.cmp;
                    if (body) {
                        body.appendChild(cmp.getEl());
                        cmp.removeCls("x-hidden");
                        cmp.setWidth(body.getWidth() - (this.scrollOffset || 0));
                        Ext.Array.remove(this.outerComponentsCache, item);
                        this.componentsCache.push(item);
                    }
                    return cmp;
                }
            }
        }
        return null;
    },
    destroy: function () {
        if (this.component && Ext.isFunction(this.component.destroy)) {
            this.component.destroy();
        }
        if (this.componentsCache) {
            this.removeComponents(true);
        }
    },
    fitCmpWidth: function (cmp) {
        if (cmp && cmp.record && this.recordsExpanded[cmp.record.internalId]) {
            var row = Ext.get(this.grid.view.getNode((this.grid.store.store || this.grid.store).getByInternalId(cmp.record.internalId)));
            if (row) {
                var body = row.down("div.x-grid-rowbody");
                cmp.setWidth(body.getWidth() - body.getPadding("lr") - (this.scrollOffset || 0));
            }
        }
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 表格行内面板
 * history:  created by 苗建龙 2015/7/2 15:56:45 
 * ***********************************************/
Ext.define('Fm.ux.grid.plugin.CisRowWidget', {
    extend: 'Ext.grid.plugin.RowWidget',
    alias: 'plugin.cisrowwidget',
    mixins: {
        observable: 'Ext.util.Observable'
    },
    /**
     * 是否展开第一行
     */
    autoExpandFirstRow: true,
    /**
     * 是否只能展开一行 为true时 行没有前面的 + 号
     */
    singleExpand: true,

    isRowExpander: true,
    /**
     * 是否Enter键展开
     */
    expandOnEnter: false,
    /**
     * 是否单击行展开
     */
    expandOnClick: true,
    /**
     * 是否双击行折叠
     */
    closeOnDblClick: true,

    constructor: function (config) {
        this.callParent(arguments);
        this.mixins.observable.constructor.call(this);
    },

    bindView: function (view) {
        var me = this,
            listeners = {};

        me.viewListeners = view.on({
            refresh: me.onViewRefresh,
            itemadd: me.onItemAdd,
            scope: me,
            destroyable: true
        });

        if (me.expandOnClick) {
            view.on('itemclick', me.onClick, me);
        }
        if (me.closeOnDblClick) {
            view.on('itemdblclick', me.onDblClick, me);
        }
        if (me.grid.lockable) {
            listeners.itemadd = me.onItemAdd;
        }

        if (me.autoExpandFirstRow) {
            view.ownerCt.on('expandfirstrow', me.onExpandFirstRow, me);
            view.on('refresh', function () {
                this.fireEvent('expandfirstrow', this)
            }, view.ownerCt);
        }
        Ext.override(view, me.viewOverrides);
    },
    isExpanded: function (record) {
        var me = this;
        return me.recordsExpanded[record.internalId] || !Ext.fly((me.normalView || me.view).getNode(record)).hasCls(me.rowCollapsedCls);
    },
    collapseAll: function () {
        Ext.suspendLayouts();
        this._doCollapseAll();
        Ext.resumeLayouts(true);
    },
    _doCollapseAll: function () {
        //try {
        var i = 0,
        records = this.view.getViewRange(),
        store = (this.grid.store.store || this.grid.store),
        len = records.length;
        for (i; i < len; i++) {
            if (this.isExpanded(records[i])) {
                this.toggleRow(records[i], records[i]);
            }
        }
        this.recordsExpanded = {};
        this.grid.view.rowBodyFeature.recordsExpanded = this.recordsExpanded;
        //var i = 0,
        //store = (this.grid.store.store || this.grid.store),
        //len = store.getCount();
        //for (i = 0; i < len; i++) {
        //    if (this.isExpanded(store.getAt(i))) {
        //        this.toggleRow(i, store.getAt(i));
        //    }
        //}
        //this.recordsExpanded = {};
        //this.grid.view.rowBodyFeature.recordsExpanded = this.recordsExpanded;
        //} catch (e) {
        //}
    },
    onClick: function (view, record, row, rowIdx, e) {
        var me = this,
            grid = me.grid,
            selectChx;

        if (grid.getSelectionModel) {
            selectChx = grid.getSelectionModel();
        }
        //SelectionModel为checkOnly时点击选择框不执行
        if (selectChx && selectChx.checkOnly && e.position.colIdx === selectChx.injectCheckbox) {
            return false;
        }

        Ext.suspendLayouts();
        if (me.singleExpand) {
            me._doCollapseAll();
        }
        if (!me.isExpanded(record)) {
            me.toggleRow(rowIdx, record);
        }
        Ext.resumeLayouts(true);
    },
    onDblClick: function (view, record, row, rowIdx, e) {
        if (this.isExpanded(record)) {
            this.toggleRow(rowIdx, record);
        }
    },
    onExpandFirstRow: function (grid) {
        var me = this,
            record = grid.getStore().getAt(0);
        if (record) {
            setTimeout(function () {
                Ext.suspendLayouts();
                if (me.singleExpand) {
                    me._doCollapseAll();
                }
                if (Ext.fly((me.normalView || me.view).getNode(record))) {
                    if (!me.isExpanded(record)) {
                        me.toggleRow(0, record);
                    }
                }
                Ext.resumeLayouts(true);
            }, 500);
        }
    },
    addExpander: function (expanderGrid) {
        var me = this,
            selModel = expanderGrid.getSelectionModel(),
            checkBoxPosition = selModel.injectCheckbox;
        //单击展开为true时 不添加展开列
        if (!me.expandOnClick) {
            me.expanderColumn = expanderGrid.headerCt.insert(0, me.getHeaderConfig());

            // If a CheckboxModel, and it's position is 0, it must now go at position one because this 
            // cell always gets in at position zero, and spans 2 columns. 
            if (checkBoxPosition === 0 || checkBoxPosition === 'first') {
                checkBoxPosition = 1;
            }
            selModel.injectCheckbox = checkBoxPosition;
        }
    },
    privates: {
        toggleRow: function (rowIdx, record) {
            var me = this,
                // If we are handling a lockable assembly, 
                // handle the normal view first 
                view = me.normalView || me.view,
                rowNode = view.getNode(rowIdx),
                normalRow = Ext.fly(rowNode),
                lockedRow,
                nextBd = normalRow.down(me.rowBodyTrSelector, true),
                wasCollapsed = normalRow.hasCls(me.rowCollapsedCls),
                addOrRemoveCls = wasCollapsed ? 'removeCls' : 'addCls',
                ownerLockable = me.grid.lockable && me.grid,
                widget;

            normalRow[addOrRemoveCls](me.rowCollapsedCls);
            Ext.fly(nextBd)[addOrRemoveCls](me.rowBodyHiddenCls);

            // All layouts must be coalesced. 
            // Particularly important for locking assemblies which need 
            // to sync row height on the next layout. 
            Ext.suspendLayouts();

            // We're expanding 
            if (wasCollapsed) {
                me.recordsExpanded[record.internalId] = true;
                widget = me.addWidget(view, record);
            } else {
                delete me.recordsExpanded[record.internalId];
                widget = me.getWidget(view, record);
            }

            // Sync the collapsed/hidden classes on the locked side 
            if (ownerLockable) {

                // Only attempt to toggle lockable side if it is visible. 
                if (ownerLockable.lockedGrid.isVisible()) {

                    view = me.lockedView;

                    // Process the locked side. 
                    lockedRow = Ext.fly(view.getNode(rowIdx));
                    // Just because the grid is locked, doesn't mean we'll necessarily have a locked row. 
                    if (lockedRow) {
                        lockedRow[addOrRemoveCls](me.rowCollapsedCls);

                        // If there is a template for expander content in the locked side, toggle that side too 
                        nextBd = lockedRow.down(me.rowBodyTrSelector, true);
                        Ext.fly(nextBd)[addOrRemoveCls](me.rowBodyHiddenCls);

                        // Pass an array if we're in a lockable assembly. 
                        if (wasCollapsed && me.lockedWidget) {
                            widget = [widget, me.addWidget(view, record)];
                        } else {
                            widget = [widget, me.getWidget(view, record)];
                        }

                    }

                    // We're going to need a layout run to synchronize row heights 
                    ownerLockable.syncRowHeightOnNextLayout = true;
                }
            }
            me.component = widget;
            me.fireEvent(wasCollapsed ? 'expand' : 'collapse', this, record, widget, nextBd, rowNode, rowIdx);
            //me.view.fireEvent(wasCollapsed ? 'expandbody' : 'collapsebody', rowNode, record, nextBd, widget);
            view.updateLayout();
            Ext.resumeLayouts(true);

            if (me.scrollIntoViewOnExpand && wasCollapsed) {
                me.grid.ensureVisible(rowIdx);
            }
        }
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 单击选中行
 * history:  created by 苗建龙 2015/7/2 15:56:45 
 * ***********************************************/
Ext.define("Fm.ux.override.grid.Panel", {
    override: "Ext.grid.Panel",
    config: {
        clickSelection: null
    },
    publishes: ['selection', 'clickSelection'],
    twoWayBindable: ['selection', 'clickSelection']
});

Ext.define('Fm.ux.grid.plugin.ClickSelection', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.clickselection',
    isClickSelection: true,
    /*
     * 是否允许选中行切换选中状态
     */
    allowDeSelect: false,
    /*
     * 点击是否为单次点击（不能重复点击）
     */
    singleClick: false,
    init: function (grid) {
        if (grid.isLocked || grid.ClickSelection) {
            return;
        }
        var me = this;
        me.grid = grid;
        me.store = grid.getStore();
        me.clickSelection = this.grid.getClickSelection();
        me.grid.getView().on("refresh", this.deSelect, me);
        me.grid.on("beforeitemclick", this._updateClickSelection, me);
        me.grid.lastSelectRecordId = null;
        var orgFn = me.grid.getView().getRowClass;
        this.grid.getView().getRowClass = function () { };
        this.grid.getView().getRowClass = function (record, rowIndex, rowParams, store) {
            var cls = orgFn(record, rowIndex, rowParams, store) || '';
            if (me.grid.lastSelectRecordId && record.getId() === me.grid.lastSelectRecordId) {
                cls = cls + ' x-grid-record-click';
            }
            return cls;
        };
    },
    destroy: function () {
        if (this.grid && !this.grid.lockable) {
            this.grid.getView().un("refresh", this.deSelect);
            this.grid.un("itemclick", this._updateClickSelection);
        }
    },
    _updateClickSelection: function (gridView, record, c, d, e) {
        if (record.get('_isDisabled')) {
            return false;
        }
        var me = this,
            grid = me.grid,
            store = grid.getStore().store || grid.getStore(),
            selectChx,
            lastRecord;
        if (me.singleClick && grid.lastSelectRecordId === record.getId()) {
            return false;
        }
        if (grid.getSelectionModel) {
            selectChx = grid.getSelectionModel();
        }
        //SelectionModel为checkOnly时点击选择框不执行
        if (selectChx && selectChx.checkOnly && e.position.colIdx === selectChx.injectCheckbox) {
            return false;
        }

        if (me.allowDeSelect && grid.lastSelectRecordId === record.getId()) {
            grid.lastSelectRecordId = null;
            grid.setClickSelection(null);
        } else {
            if (grid.lastSelectRecordId !== null) {
                lastRecord = store.getById(grid.lastSelectRecordId);
            }
            grid.lastSelectRecordId = record.getId();
            grid.setClickSelection(record);
        }

        if (lastRecord) {
            lastRecord.set('_rowclassclick', !lastRecord.get('_rowclassclick'));
        }
        record.set('_rowclassclick', !record.get('_rowclassclick'));
        return true;
    },
    deSelect: function () {
        this._clearClickSelection();
    },
    _clearClickSelection: function () {
        var me = this,
            grid = me.grid,
            store = grid.getStore();
        try {
            if (grid.lastSelectRecordId) {
                if (store && !store.isEmptyStore) {
                    var rec = store.getById(grid.lastSelectRecordId);
                    if (rec) {
                        var row = grid.getView().getRow(rec);
                        if (row) {
                            Ext.get(row).removeCls('x-grid-record-click');
                        }
                    }
                }
                grid.lastSelectRecordId = null;
            }
        } catch (e) { }
        if (grid.setClickSelection) {
            grid.setClickSelection(null);
        }
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 表格行内表格
 * history:  created by 苗建龙 2015/7/2 15:56:45 
 * ***********************************************/
Ext.define('Fm.ux.grid.plugin.SubTable', {
    extend: 'Ext.grid.plugin.RowExpander',

    alias: 'plugin.subtable',

    //rowBodyTpl: ['<table class="' + Ext.baseCSSPrefix + 'grid-subtable" cellpadding="2" cellspacing="0">',
    //    '{%',
    //        'this.owner.renderTable(out, values);',
    //    '%}'
    //],
    rowBodyTpl: ['<div class="x-grid-subtable-con">',
        '{%',
            'this.owner.renderTable(out, values);',
        '%}',
        '<div>'
    ],
    /**
     * 是否展开第一行
     */
    autoExpandFirstRow: true,
    /**
     * 是否全部展开
     */
    autoExpandAllRow: false,

    pageSize: 10,
    //合计列  ['col1']
    sumColumns: [],
    //统计行格式 如 '数量总计:{col1}'
    sumFormat: '',

    init: function (grid) {
        Ext.log.warn('表格插件 Fm.ux.grid.plugin.SubTable 不建议继续使用，替代：Fm.ux.grid.plugin.CisRowWidget');
        var me = this,
            view,
            columns = me.columns,
            len, i, columnCfg;

        me.callParent(arguments);

        view = grid.getView();
        if (me.autoExpandFirstRow && !me.autoExpandAllRow) {
            view.ownerCt.on('expandfirstrow', me.onExpandFirstRow, me);
            view.on('refresh', function () {
                view.ownerCt.fireEvent('expandfirstrow', grid)
            }, view.ownerCt);
        }

        if (me.autoExpandAllRow) {
            view.ownerCt.on('expandalltrow', me.onExpandAllRow, me);
            view.on('refresh', function () {
                view.ownerCt.fireEvent('expandalltrow', grid)
            }, view.ownerCt);
        }

        view.on({
            expandbody: function (node, record, c) {
                me.swallowEvent(node.id);
                if (record._isrendersubpage) {
                    return;
                }
                record._isrendersubpage = true;
                me.rendPageByRecord(node.id, record, me);
            }
        });

        grid.on('beforeitemdblclick', function (a, b, c, d, e) {
            if (Ext.get(e.target).up('.x-grid-subtable-con')) {
                e.stopEvent();
                return false;
            }
        });

        me.columns = [];
        if (columns) {
            for (i = 0, len = columns.length; i < len; ++i) {
                columnCfg = Ext.apply({
                    preventRegister: true
                }, columns[i]);
                columnCfg.xtype = columnCfg.xtype || 'gridcolumn';
                me.columns.push(Ext.widget(columnCfg));
            }
        };
    },

    onExpandFirstRow: function (grid) {
        var me = this,
            view = grid.view,
            row = view.getRow(0),
            record;
        if (!row) {
            return;
        }
        setTimeout(function () {
            if (Ext.get(row)) {
                try {
                    record = grid.getStore().getAt(0);
                    me.expandRow(0, record);
                } catch (e) { }
            }
        }, 150);
    },
    onExpandAllRow: function (grid) {
        var me = this,
            view = grid.view,
            row,
            record,
            store = grid.getStore();
        setTimeout(function () {
            for (var i = 0; i < store.data.length; i++) {
                row = view.getRow(i);
                if (Ext.get(row)) {
                    try {
                        record = grid.getStore().getAt(i);
                        me.expandRow(i, record);
                    } catch (e) { }
                }
            }
        }, 150);
    },
    expandRow: function (rowIdx, record) {
        var me = this,
            view = me.view,
            rowNode = view.getNode(rowIdx),
            normalRow = Ext.fly(rowNode),
            wasCollapsed = normalRow.hasCls(me.rowCollapsedCls);
        if (wasCollapsed) {
            me.toggleRow(rowIdx, record);
        }
    },
    destroy: function () {
        var columns = this.columns,
            len, i;

        if (columns) {
            for (i = 0, len = columns.length; i < len; ++i) {
                columns[i].destroy();
            }
        }
        this.columns = null;
        this.callParent();
    },

    getRowBodyFeatureData: function (record, idx, rowValues) {
        this.callParent(arguments);
        rowValues.rowBodyCls += ' ' + Ext.baseCSSPrefix + 'grid-subtable-row';
    },
    getTableHtml: function (record, page) {
        var me = this,
            columns = me.columns,
            numColumns = columns.length,
            associatedRecords = me.getAssociatedRecords(record),
            recCount = associatedRecords.length,
            rec, column, i, j, value, out = [];

        var pageSize = me.pageSize,
            page = page || 1,
            star = pageSize * (page - 1),
            end = pageSize * page;
        if (end > recCount) {
            end = recCount;
        }

        out.push('<tr>');
        for (j = 0; j < numColumns; j++) {
            column = columns[j];
            out.push('<th style="white-space: nowrap;"><div' +
                (column.width != null ? ' style="display:block;width:' + column.width + 'px"' : '') +
                '>', columns[j].text, '</div></th>');
        }
        out.push('</tr>');
        for (var i = star; i < end; i++) {
            rec = associatedRecords[i];
            out.push('<tr>');
            for (j = 0; j < numColumns; j++) {
                column = columns[j];
                //value = rec.get(column.dataIndex);
                value = rec[column.dataIndex];
                if (column.renderer && column.renderer.call) {
                    value = column.renderer.call(column.scope || me, value, {}, rec);
                }
                if (column.autoExpand) {
                    out.push('<td class="sub_table_inner_cell x-text-nowrap" ');
                } else {
                    out.push('<td class="sub_table_inner_cell x-text-break" ');
                }
                if (column.align) {
                    out.push(' style="text-align:' + column.align + ';"');
                }
                out.push('>', value, '</td>');
            }
            out.push('</tr>');
        }
        return out.join('');
    },
    swallowEvent: function (nodeid) {
        var subBody = Ext.get(nodeid);
        if (subBody && subBody.el) {
            subBody.el.swallowEvent(['mousedown', 'mousemove', 'mouseup', 'contextmenu', 'mouseover', 'mouseout'], false);

            rowBody = subBody.down('tr.x-grid-subtable-row');
            if (rowBody && rowBody.el) {
                rowBody.el.swallowEvent(['click', 'mousedown', 'mousemove', 'mouseup', 'dblclick', 'contextmenu', 'mouseover', 'mouseout'], false);
            }

            var clipboard = new Clipboard(subBody.el.dom.querySelectorAll('.sub_table_inner_cell'), {
                text: function (item) {
                    return Ext.String.trim(item.innerText || item.textContent || '');
                }
            });
        }
    },
    rendPageByRecord: function (nodeid, record, scope) {
        var me = scope || this,
            associatedRecords = me.getAssociatedRecords(record);

        me.swallowEvent(nodeid);

        if (associatedRecords.length / me.pageSize <= 1) {
            return true;
        };

        var pageBar = new fei.pageBar({
            nowPage: record._subtablepagenum || 1,
            totalSize: associatedRecords.length,
            pageSize: me.pageSize,
            callback: function (index) {
                record._subtablepagenum = index;
                me.pageRenderTable(nodeid, record, scope);
                me.rendPageByRecord(nodeid, record, scope);
            }
        });
        pageBar.render("subPage_" + nodeid + record.getId());
    },
    pageRenderTable: function (nodeid, record, scope) {
        var me = this,
            pageConId = nodeid + record.getId(),
            html = me.getTableHtml(record, record._subtablepagenum || 1);

        document.getElementById('subPage_table_' + pageConId).innerHTML = html;
    },
    renderTable: function (out, rowValues) {
        var me = this,
            associatedRecords = me.getAssociatedRecords(rowValues.record),
            pageConId = rowValues.rowId + rowValues.record.getId(),
            html;

        html = me.getTableHtml(rowValues.record, 1);
        out.push('<table class="x-grid-subtable" id="subPage_table_' + pageConId + '" cellpadding="2" cellspacing="0">');
        out.push(html);
        if (me.sumColumns && me.sumColumns.length > 0) {
            var sums = me.getSums(rowValues);
            var sumHtml = me.sumFormat;
            for (var i = 0; i < me.sumColumns.length; i++) {
                var cValue = sums[me.sumColumns[i]];
                var pC = Ext.Array.filter(me.columns, function (item) {
                    return item['dataIndex'] === me.sumColumns[i];
                })[0];
                if (pC && pC.renderer) {
                    cValue = pC.renderer(cValue);
                }
                sumHtml = sumHtml.replace('{' + me.sumColumns[i] + '}', cValue);
            }
            out.push('<tr><td colspan="' + me.columns.length + '">' + sumHtml + '</td></tr>');
        }
        out.push('</table>');
        if (associatedRecords.length / me.pageSize > 1) {
            out.push('<div class="page" id="subPage_' + pageConId + '"></div>');
        }
    },

    getSums: function (rowValues) {
        var me = this,
            associatedRecords = me.getAssociatedRecords(rowValues.record),
            sums = {},
            rec;
        //if (me.sums[record.getId()]) {
        //    return;
        //}
        for (var i = 0; i < me.sumColumns.length; i++) {
            sums[me.sumColumns[i]] = 0;
        }
        for (var i = 0; i < associatedRecords.length; i++) {
            rec = associatedRecords[i];
            for (var j = 0; j < me.sumColumns.length; j++) {
                sums[me.sumColumns[j]] += (parseFloat(rec[me.sumColumns[j]], 10) || 0);
            }
        }
        //me.sums[record.getId()] = sums;
        //return record[this.association]().getRange();
        return sums;
    },
    getRowBodyContentsFn: function (rowBodyTpl) {
        var me = this;
        return function (rowValues) {
            rowBodyTpl.owner = me;
            return rowBodyTpl.applyTemplate(rowValues);
        };
    },

    getAssociatedRecords: function (record) {
        //return record[this.association]().getRange();
        return record.get(this.association);
    },
    getExportColumns: function () {
        var me = this,
            columns = me.columns;

        var exportColumns = Ext.Array.filter(columns, function (column) {
            return !column.isCheckerHd && !column.ignoreExport;
        });

        return exportColumns;
    },
    exportAlign: {
        'left': 'Left',
        'right': 'Right',
        'center': 'Center'
    },
    //获取导出数据
    getExportData: function (records) {
        var me = this,
            exportColumns = me.getExportColumns(),
            lenCols = exportColumns.length,
            titles = [],
            rows = [],
            record, row, col, v,
            regExp = /<.*>(.*)<\/.*>|<.*\/>/;

        Ext.Array.each(exportColumns, function (column) {
            if (!column.isCheckerHd && !column.ignoreExport) {
                var width = column.exportWidth || column.width;
                try {
                    width = column.getWidth();
                } catch (e) { }
                titles.push({
                    TitleName: column.text,
                    TitleValue: column.exportIndex || column.dataIndex,
                    TitleWide: Math.ceil(width / 7.5),
                    IsRMB: !!column.exportIsRMB,
                    IsCount: !!column.exportIsCount,
                    CellType: me.exportAlign[column.align]
                });
            }
        });

        for (var i = 0; i < records.length; i++) {
            record = records[i];
            row = {};

            for (var j = 0; j < lenCols; j++) {
                col = exportColumns[j];
                v = record.get(col.dataIndex);
                if (col.exportRender) {
                    v = col.exportRender(v, null, record);
                } else if (col.renderer) {
                    v = col.renderer(v, null, record);
                }
                if (v === null || v === undefined) {
                    v = '';
                }
                v = v.toString();
                if (v) {
                    //替换金额数字
                    _v = v.replace(/￥/g, '');
                    if (_v) {
                        v = _v;
                        //处理html标签
                        var _temp = v.match(regExp);
                        if (_temp) {
                            v = _temp[1];
                        }
                    }
                }
                row[col.exportIndex || col.dataIndex] = v.trim();
            }

            rows.push(row);
        }

        return {
            titles: titles,
            rows: rows
        };
    }
});

/**
*客户端生成页码条
*苗建龙
*/
fei = {}
fei.pageBar = function (config) {
    this.nowPage = 1;
    this.totalSize = 100;
    this.pageSize = 10;
    this.pageNumBarLength = 2;
    this.isSyncPageSize = true;
    this.callback = function (index) { alert(index); }

    for (var item in config) {
        this[item] = config[item];
    }
}

fei.pageBar.prototype.render = function (id) {
    var me = this;

    this.container = document.getElementById(id);
    this.container.innerHTML = "";

    this.nowPage = parseInt(this.nowPage, 10);
    this.totalSize = parseInt(this.totalSize, 10);
    this.pageSize = parseInt(this.pageSize, 10);
    this.pageNumBarLength = parseInt(this.pageNumBarLength, 10);
    this.totalPage = Math.ceil(this.totalSize / this.pageSize) < 1 ? 1 : Math.ceil(this.totalSize / this.pageSize);

    if (this.nowPage < 1) {
        this.nowPage = 1;
    }
    if (this.isSyncPageSize) {
        this._appendSyncPageSize();
    }

    this._appendPageNumBar();
}

fei.pageBar.prototype._appendSyncPageSize = function () {
    var me = this;

    var my = document.createElement("label");
    my.innerHTML = "每页 " + me.pageSize +
        " 条&nbsp;共 " + me.totalSize +
        ' 条&nbsp;&nbsp;';
    me.container.appendChild(my);
}

fei.pageBar.prototype._appendPageNumBar = function () {
    var i = this.nowPage - this.pageNumBarLength;
    if (i < 2) {
        i = 2;
    }
    this._getPageNumText(1, "1", true);
    if (i > 2) {
        var split = document.createElement("label");
        split.innerHTML = "...";
        this.container.appendChild(split);
    }
    for (i; i < this.nowPage; i++) {
        this._getPageNumText(i, i, true);
    }

    var numMax = this.nowPage + this.pageNumBarLength;
    if (numMax > this.totalPage - 1) {
        numMax = this.totalPage - 1;
    }
    var j = this.nowPage;
    if (j < 2) {
        j = 2;
    }
    for (j; j <= numMax; j++) {
        this._getPageNumText(j, j, true);
    }

    if (numMax < this.totalPage - 1) {
        var split = document.createElement("label");
        split.innerHTML = "...";
        this.container.appendChild(split);
    }

    if (this.totalPage > 1) {
        this._getPageNumText(this.totalPage, this.totalPage, true);
    }
}

fei.pageBar.prototype._getPageNumText = function (pageNum, pageText, isNum) {
    var me = this;
    if (pageNum == me.nowPage) {
        var nowNum = document.createElement("span");
        nowNum.innerHTML = pageText;
        me.container.appendChild(nowNum);
    }
    else {
        var num = document.createElement("a");
        num.href = "javascript:void(0)";

        var fn = function () {
            me.callback.call(window, pageNum);
        }
        if (num.addEventListener) {
            num.addEventListener("click", fn, false);
        }
        else if (num.attachEvent) {
            num.attachEvent('onclick', fn);
        }
        else {
            num["onclick"] = fn;
        }
        num.innerHTML = pageText;
        this.container.appendChild(num);
    }
}
/* ***********************************************
 * author :  苗建龙
 * function: 日期联动控件
 * history:  created by 苗建龙 2015/6/9 15:12:18 
 * ***********************************************/
Ext.define('Fm.ux.DateRange', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.daterange',
    requires: [
        'Ext.form.field.Date'
    ],
    fieldLabel: '日期范围',
    width: 330,
    labelWidth: 60,
    layout: 'column',
    labelAlign: 'right',
    defaults: {
        width: 120,
        labelWidth: 60,
        xtype: 'datefield',
        labelAlign: 'right'
    },

    /**
     * 日期比较部分
     */
    addTnterval: Ext.Date.MONTH,

    /**
     * 日期差值 配合 addTnterval
     */
    addValue: 1,

    /**
     * 联动模式 's-e'为开始时间联动结束时间 'e-s'为结束时间联动开始时间
     */
    addModel: ['s-e'],

    disableLD: false,

    //是否验证结束日期大于开始日期
    isValidateMoreThen: true,

    initComponent: function () {
        var me = this,
            starDate,
            endDate,
            temp = new Date().getTime();

        Ext.apply(me.items[0], {
            width: 95,
            itemId: 'startdt' + temp,
            endDateField: 'enddt' + temp,
            vtype: 'daterange',
            validateOnChange: false,
            isRequirsResetMaxMinValue: true
        });

        Ext.apply(me.items[1], {
            width: 100,
            itemId: 'enddt' + temp,
            //startDateField: 'startdt' + temp,
            vtype: 'daterange',
            fieldLabel: '-',
            errorfieldLabel: '结束日期',
            labelWidth: 5,
            labelSeparator: '',
            labelAlign: 'right',
            style: {
                //两个时间框中间'-'居中
                marginLeft: '3px;'
            },
            isRequirsResetMaxMinValue: true
        });

        me.callParent();

        starDate = me.items.items[0],
        endDate = me.items.items[1];

        //先判断change事件是否存在，如果存在，则在change事件追加事件处理
        //if (!starDate.hasListener('change')) {
        //    starDate.on('change', me.autoFormat);
        //} else {
        //    starDate.onAfter('change', me.autoFormat);
        //}

        //if (!endDate.hasListener('change')) {
        //    endDate.on('change', me.autoFormat);
        //} else {
        //    endDate.onAfter('change', me.autoFormat);
        //}

        //联动
        if (Ext.Array.contains(me.addModel, 's-e')) {
            var tempFn = function (obj) {
                if (me.disableLD) {
                    return;
                }
                var date = obj.getValue();
                if (!date || !Ext.isDate(date)) {
                    return;
                }

                var endValue = Ext.Date.add(date, me.addTnterval, me.addValue);

                //如果按月加,则需要减1天
                if (me.addTnterval === Ext.Date.MONTH) {
                    endDate.setValue(Ext.Date.add(endValue, Ext.Date.DAY, -1));
                    endDate.fireEvent('updatebind', Ext.Date.add(endValue, Ext.Date.DAY, -1));
                }
                else {
                    endDate.setValue(endValue);
                    endDate.fireEvent('updatebind', endValue);
                }
            };
            setTimeout(function () {
                starDate.on('blur', tempFn);
                starDate.on('select', tempFn);
            }, 500);
        }
        if (Ext.Array.contains(me.addModel, 'e-s')) {
            var tempFn = function (obj) {
                if (me.disableLD) {
                    return;
                }
                var date = obj.getValue();
                if (!date || !Ext.isDate(date)) {
                    return;
                }
                var startValue = Ext.Date.add(date, me.addTnterval, me.addValue * -1);
                starDate.setValue(startValue);
                starDate.fireEvent('updatebind', startValue);
            }
            setTimeout(function () {
                endDate.on('blur', tempFn);
                endDate.on('select', tempFn);
            }, 500);
        }
    },
    checkDate: function (date) {
        if (date instanceof Date) {
            return true;
        }
        if (date) {
            return (new Date(date).getDate() == date.toString().substring(date.length - 2));
        }
        return false;
    },
    autoFormat: function (obj, newValue) {
        var value,
            dateRange = obj.up('daterange');

        if (newValue) {
            var isAlreadyDate = dateRange.checkDate(newValue);
            if (!isAlreadyDate) {
                dateString = newValue.toString().replace(/-/g, '');
                switch (dateString.length) {
                    case 5:
                        value = dateString.substr(0, 4) + '-' + dateString.substr(4, 1);
                        break;
                    case 6:
                        value = dateString.substr(0, 4) + '-' + dateString.substr(4, 2);
                        break;
                    case 7:
                        var value = dateString.substr(0, 4) + '-' + dateString.substr(4, 2) + '-' + dateString.substr(6, 1);
                        break;
                    case 8:
                        value = dateString.substr(0, 4) + '-' + dateString.substr(4, 2) + '-' + dateString.substr(6, 2);
                        obj.fireEvent('blur', obj);
                        break;
                    default:
                        return;
                }
                obj.setRawValue(value);
            } else {
                if (obj.rawValue.length === 10) {
                    obj.fireEvent('blur', obj);
                }
            }
        }
    }
});

/* ***********************************************
 * author :  fei85
 * function: 
 * history:  created by fei85 2016/1/21 16:13:51 
 * ***********************************************/
Ext.define("Fm.ux.IFrame", {
    extend: 'Ext.Component',

    alias: 'widget.uxiframe',

    loadMask: AppConfig.maskHtml,

    src: 'about:blank',

    renderTpl: [
        '<iframe src="{src}" id="{id}-iframeEl" data-ref="iframeEl" name="{frameName}" width="100%" height="100%" frameborder="0"></iframe>'
    ],
    childEls: ['iframeEl'],

    initComponent: function () {
        var me = this;
        me.callParent();

        me.frameName = me.frameName || me.id + '-frame';
    },
    onRender: function () {
        var me = this;
        me.callParent();

        if (me.htmlContent) {
            me.setHtmlContent(me.htmlContent);
        }

        me.onKeyDown(me.getDoc());

    },

    setHtmlContent: function (html) {
        var me = this;
        var doc = me.getDoc();
        if (doc) {
            doc.open();
            doc.write(html);
            doc.close();

            var link = doc.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = (AppConfig.UrlStartWith || '') + 'FmContent/lib/ueditor/themes/ueditor.iframe.css';

            doc.getElementsByTagName('head')[0].appendChild(link);
        }

        me.onKeyDown(doc);
    },

    onKeyDown: function (doc) {
        var me = this;

        if (!doc.onkeydown) { //如果没注册过
            doc.onkeydown = function (e) {
                if (e.keyCode === 27) {
                    var win = me.up('window');
                    win.close();
                }
            }
        }
    },

    initEvents: function () {
        var me = this;
        me.callParent();
        me.iframeEl.on('load', me.onLoad, me);
    },

    initRenderData: function () {
        return Ext.apply(this.callParent(), {
            src: this.src,
            frameName: this.frameName
        });
    },

    getBody: function () {
        var doc = this.getDoc();
        return doc.body || doc.documentElement;
    },

    getDoc: function () {
        try {
            return this.getWin().document;
        } catch (ex) {
            return null;
        }
    },

    getWin: function () {
        var me = this,
            name = me.frameName,
            win = Ext.isIE
                ? me.iframeEl.dom.contentWindow
                : window.frames[name];
        return win;
    },

    getFrame: function () {
        var me = this;
        return me.iframeEl.dom;
    },

    beforeDestroy: function () {
        this.cleanupListeners(true);
        this.callParent();
    },

    cleanupListeners: function (destroying) {
        var doc, prop;

        if (this.rendered) {
            try {
                doc = this.getDoc();
                if (doc) {
                    Ext.get(doc).un(this._docListeners);
                    if (destroying) {
                        for (prop in doc) {
                            if (doc.hasOwnProperty && doc.hasOwnProperty(prop)) {
                                delete doc[prop];
                            }
                        }
                    }
                }
            } catch (e) { }
        }
    },

    onLoad: function () {
        var me = this,
            doc = me.getDoc(),
            fn = me.onRelayedEvent;

        if (doc) {
            try {
                // These events need to be relayed from the inner document (where they stop
                // bubbling) up to the outer document. This has to be done at the DOM level so
                // the event reaches listeners on elements like the document body. The effected
                // mechanisms that depend on this bubbling behavior are listed to the right
                // of the event.
                Ext.get(doc).on(
                    me._docListeners = {
                        mousedown: fn, // menu dismisal (MenuManager) and Window onMouseDown (toFront)
                        mousemove: fn, // window resize drag detection
                        mouseup: fn,   // window resize termination
                        click: fn,     // not sure, but just to be safe
                        dblclick: fn,  // not sure again
                        scope: me
                    }
                );
            } catch (e) {
                // cannot do this xss
            }

            // We need to be sure we remove all our events from the iframe on unload or we're going to LEAK!
            Ext.get(this.getWin()).on('beforeunload', me.cleanupListeners, me);

            this.el.unmask();
            this.fireEvent('load', this);

        } else if (me.src) {

            this.el.unmask();
            this.fireEvent('error', this);
        }


    },

    onRelayedEvent: function (event) {
        // relay event from the iframe's document to the document that owns the iframe...

        var iframeEl = this.iframeEl,

            // Get the left-based iframe position
            iframeXY = iframeEl.getTrueXY(),
            originalEventXY = event.getXY(),

            // Get the left-based XY position.
            // This is because the consumer of the injected event will
            // perform its own RTL normalization.
            eventXY = event.getTrueXY();

        // the event from the inner document has XY relative to that document's origin,
        // so adjust it to use the origin of the iframe in the outer document:
        event.xy = [iframeXY[0] + eventXY[0], iframeXY[1] + eventXY[1]];

        event.injectEvent(iframeEl); // blame the iframe for the event...

        event.xy = originalEventXY; // restore the original XY (just for safety)
    },

    load: function (src) {
        var me = this,
            text = me.loadMask,
            frame = me.getFrame();

        if (me.fireEvent('beforeload', me, src) !== false) {
            if (text && me.el) {
                me.el.mask(text);
            }

            frame.src = me.src = (src || me.src);
        }
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 图片浏览器 缩放 旋转
 * history:  created by 苗建龙 2015/7/31 13:54:07 
 * history:  update by 苗建龙 2015/8/2 13:54:07 
 *           添加图片列表浏览功能 
 *           左右切换图片
 *           改造css3动画效果 
 *           添加鼠标滚轮事件 
 *           添加拖动放大功能 
 *           添加移动图片功能 
 *           添加原图查看功能
 *           IE6-8 
 * ***********************************************/
Ext.define("Fm.ux.ImageView", {
    extend: 'Ext.panel.Panel',
    requires: ['Fm.ux.IFrame'],
    alias: 'widget.imageview',
    imageIndex: 0,
    /**
     * 图片列表 多图查看
     */
    imageList: [],
    layout: 'fit',
    loadingMsg: '加载中...',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'uxiframe',
            src: AppConfig.urlStartWith + 'FmContent/lib/feiimageview/viewpanel.html?v=1&imageList=' + encodeURIComponent(Ext.JSON.encode(me.imageList)) + '&index=' + me.imageIndex,
            listeners: {
                load: function (frame) {
                    me.image = frame.getWin()._fImagePanel.image;
                },
                error: function () {

                }
            }
        }];

        me.callParent();
    },
    getImage: function () {
        return this.image;
    }
});
/* ***********************************************
 * author :  fei85
 * function: 思维导图控件 https://github.com/hizzgdev/jsmind
 * history:  created by fei85 2016/11/7 14:02:46 
 {
    xtype: 'mindmap',
    width: 600,
    height: 600,
    jmData: [
        { "id": "root", "isroot": true, "topic": "jsMind" },

        { "id": "sub1", "parentid": "root", "topic": "sub1", "background-color": "#0000ff" },
        { "id": "sub11", "parentid": "sub1", "topic": "sub11" },
        { "id": "sub12", "parentid": "sub1", "topic": "sub12" },
        { "id": "sub13", "parentid": "sub1", "topic": "sub13" },

        { "id": "sub2", "parentid": "root", "topic": "sub2" },
        { "id": "sub21", "parentid": "sub2", "topic": "sub21" },
        { "id": "sub22", "parentid": "sub2", "topic": "sub22", "foreground-color": "#33ff33" },

        { "id": "sub3", "parentid": "root", "topic": "sub3" },
    ]
}
 * ***********************************************/
Ext.define("Fm.ux.MindMap", {
    extend: 'Ext.container.Container',
    alias: ['widget.mindmap'],
    twoWayBindable: ['jmData'],
    defaultBindProperty: 'jmData',
    publishes: ['jmDataChange'],
    config: {
        jmData: []
    },
    jmOptions: {
    },
    onRender: function () {
        var me = this;
        me.callParent();
        me.toolTip = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    xtype: 'container',
                    minWidth: 100,
                    minHeight: 50,
                    padding: 5,
                    style: { 
                        color: '#555'
                    },
                    html: 'tooltip'
                }
            ]
        });
        me.showJm();
    },
    showJm: function () {
        var me = this,
            innerCtId = me.getId() + '-innerCt',
            mind,
            options;

        if (!me.jmData || me.jmData.length < 1) {
            return;
        }

        mind = {
            "meta": {
                "name": me.getId(),
                "author": "mjl",
                "version": "1.0"
            },
            "format": "node_array",
            "data": me.jmData
        };

        options = Ext.apply({
            editable: false,
            theme: 'greensea',
            container: innerCtId,
            support_html: true,
            default_event_handle: {
                enable_mousedown_handle: true,
                enable_click_handle: true,
                enable_dblclick_handle: false
            },
            view: {
                line_color: ['#ff0000', '#00ff08', '#0014ff', '#ffa500', '#683489', '#136987', '#456852']
            }
        }, me.jmOptions);

        var jm = me.jm = new jsMind(options);
        jm.show(mind);

        var el = me.getEl(),
            nodes = el.query('jmnode');

        el.on('contextmenu', function (e) {
            e.stopEvent();
        });

        for (var i = 0; i < nodes.length; i++) {
            var nodeEl = Ext.get(nodes[i]);
            nodeEl.on('contextmenu', function (e) {
                me.fireEvent('contextMenu', me.jm.get_selected_node(), e);
            });
            nodeEl.on('click', function (e) {
                me.fireEvent('nodeClick', me.jm.get_selected_node(), e);
            });
            nodeEl.on('mouseover', function (e, nElement) {
                var nodeid = me.jm.view.get_binded_nodeid(nElement),
                    _node = me.jm.get_node(nodeid);
                if (_node.data.toolTip) {
                    me.toolTip.down('container').setConfig({ html: _node.data.toolTip });
                    me.toolTip.showAt(e.getPoint());
                } else {
                    me.toolTip.down('container').setConfig({ html: '' });
                }
            });
            nodeEl.on('mouseout', function (e, nElement) {
                me.toolTip.hide();
            });
        }
    },
    setJmData: function (data) {
        var me = this;
        me.jmData = data;

        if (me.rendered) {
            me.showJm();
        }
    },
    getJmData: function () {
        var me = this,
            mind_data = me.jm.get_data('node_array');

        me.jmData = mind_data.data;

        return me.jmData;
    }
});
/**
 * Plugin for adding a close context menu to tabs. Note that the menu respects
 * the closable configuration on the tab. As such, commands like remove others
 * and remove all will not remove items that are not closable.
 */
Ext.define('Fm.ux.TabCloseMenu', {
    extend: 'Ext.plugin.Abstract',

    alias: 'plugin.tabclosemenu',

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @cfg {String} closeTabText
     * The text for closing the current tab.
     */
    closeTabText: 'Close Tab',

    /**
     * @cfg {Boolean} showCloseOthers
     * Indicates whether to show the 'Close Others' option.
     */
    showCloseOthers: true,

    /**
     * @cfg {String} closeOthersTabsText
     * The text for closing all tabs except the current one.
     */
    closeOthersTabsText: 'Close Other Tabs',

    /**
     * @cfg {Boolean} showCloseAll
     * Indicates whether to show the 'Close All' option.
     */
    showCloseAll: true,

    /**
     * @cfg {String} closeAllTabsText
     * The text for closing all tabs.
     */
    closeAllTabsText: 'Close All Tabs',

    /**
     * @cfg {Array} extraItemsHead
     * An array of additional context menu items to add to the front of the context menu.
     */
    extraItemsHead: null,

    /**
     * @cfg {Array} extraItemsTail
     * An array of additional context menu items to add to the end of the context menu.
     */
    extraItemsTail: null,

    // TODO - doc this.addEvents('aftermenu','beforemenu');

    //public
    constructor: function (config) {
        this.callParent([config]);
        this.mixins.observable.constructor.call(this, config);
    },

    init : function(tabpanel){
        this.tabPanel = tabpanel;
        this.tabBar = tabpanel.down("tabbar");

        this.mon(this.tabPanel, {
            scope: this,
            afterlayout: this.onAfterLayout,
            single: true
        });
    },

    onAfterLayout: function() {
        this.mon(this.tabBar.el, {
            scope: this,
            contextmenu: this.onContextMenu,
            delegate: '.x-tab'
        });
    },

    destroy : function(){
        this.callParent();
        Ext.destroy(this.menu);
    },

    // private
    onContextMenu : function(event, target){
        var me = this,
            menu = me.createMenu(),
            disableAll = true,
            disableOthers = true,
            tab = me.tabBar.getChildByElement(target),
            index = me.tabBar.items.indexOf(tab);

        me.item = me.tabPanel.getComponent(index);
        menu.child('#close').setDisabled(!me.item.closable);

        if (me.showCloseAll || me.showCloseOthers) {
            me.tabPanel.items.each(function(item) {
                if (item.closable) {
                    disableAll = false;
                    if (item !== me.item) {
                        disableOthers = false;
                        return false;
                    }
                }
                return true;
            });

            if (me.showCloseAll) {
                menu.child('#closeAll').setDisabled(disableAll);
            }

            if (me.showCloseOthers) {
                menu.child('#closeOthers').setDisabled(disableOthers);
            }
        }

        event.preventDefault();
        me.fireEvent('beforemenu', menu, me.item, me);

        menu.showAt(event.getXY());
    },

    createMenu : function() {
        var me = this;

        if (!me.menu) {
            var items = [{
                itemId: 'close',
                text: me.closeTabText,
                scope: me,
                handler: me.onClose
            }];

            if (me.showCloseAll || me.showCloseOthers) {
                items.push('-');
            }

            if (me.showCloseOthers) {
                items.push({
                    itemId: 'closeOthers',
                    text: me.closeOthersTabsText,
                    scope: me,
                    handler: me.onCloseOthers
                });
            }

            if (me.showCloseAll) {
                items.push({
                    itemId: 'closeAll',
                    text: me.closeAllTabsText,
                    scope: me,
                    handler: me.onCloseAll
                });
            }

            if (me.extraItemsHead) {
                items = me.extraItemsHead.concat(items);
            }

            if (me.extraItemsTail) {
                items = items.concat(me.extraItemsTail);
            }

            me.menu = Ext.create('Ext.menu.Menu', {
                items: items,
                listeners: {
                    hide: me.onHideMenu,
                    scope: me
                }
            });
        }

        return me.menu;
    },

    onHideMenu: function () {
        var me = this;
        me.fireEvent('aftermenu', me.menu, me);
    },

    onClose : function(){
        this.tabPanel.remove(this.item);
    },

    onCloseOthers : function(){
        this.doClose(true);
    },

    onCloseAll : function(){
        this.doClose(false);
    },

    doClose : function(excludeActive){
        var items = [];

        this.tabPanel.items.each(function(item){
            if(item.closable){
                if(!excludeActive || item !== this.item){
                    items.push(item);
                }
            }
        }, this);

        Ext.suspendLayouts();
        Ext.Array.forEach(items, function(item){
            this.tabPanel.remove(item);
        }, this);
        Ext.resumeLayouts(true);
    }
});

/* ***********************************************
 * author :  fei85
 * function: 
 * history:  created by fei85 2017/4/12 9:35:30 
 * ***********************************************/
window._fmapp_now_mask_view = '';
var app,
    application;
Ext.define("Fm.base.Application", {
    extend: 'Ext.app.Application',
    enabled: true,
    alternateClassName: ['Fm.BaseApp'],
    requires: [
        'Ext.window.Toast',
        'Ext.window.MessageBox'
    ],
    launch: function () {
        Ext.tip.QuickTipManager.init();
        //Ext.form.Field.prototype.msgTarget = 'side';
        app = application = this;

        app.globalMask = new Ext.LoadMask({
            msg: AppConfig.maskHtml,
            style: {
                backgroundColor: 'rgba(255, 255, 255, 0.5);',
                zIndex: '90000000'
            },
            border: false,
            target: app.getMainView()
        });

        document.getElementById('start_main').style.display = "none";
    },
    mask: null,
    masks: {},
    showMask: function (view, param) {
        var me = application,
            maskView = me.getMainView().down(view + '[maskParam=' + param + ']'),
            key = (view || '') + (param || '');
        if (!maskView) {
            maskView = me.getMainView().down(view);
        }

        window._fmapp_now_mask_view = key;
        if (!key) {
            me.globalMask.show();
        } else {
            if (maskView) {
                if (!me.masks[key]) {
                    me.masks[key] = new Ext.LoadMask({
                        msg: AppConfig.maskHtml,
                        //cls:'x-cis-mask',
                        style: {
                            backgroundColor: 'rgba(255, 255, 255, 0.5);'
                        },
                        border: false,
                        target: maskView
                    });
                }
                me.masks[key].show();
            }
        }

        if (!view) {
            Ext.log.error("[showMask] 需要传入view参数.");
            try {
                //模拟异常 获取调用堆栈
                var temp = view.exception;
            } catch (e) {
                Ext.log.error(e.stack);
            }
        }
    },
    hideMask: function (view, param) {
        var me = application,
            key = (view || '') + (param || '');

        if (!key) {
            me.globalMask.hide();
        } else {
            if (me.masks[key]) {
                Ext.destroy(me.masks[key]);
                me.masks[key] = undefined;
            }
        }

        if (!view) {
            Ext.log.error("[showMask] 需要传入view参数.");
            try {
                //模拟异常 获取调用堆栈
                var temp = view.exception;
            } catch (e) {
                Ext.log.error(e.stack);
            }
        }
    },
    loginOut: function (choice) {
        application.showMask();
        var getUrlKey = function () {
            key = window.location.pathname.toLowerCase();
            if (key.substr(0, AppConfig.urlStartWith.length) === AppConfig.urlStartWith) {
                key = key.substr(0, AppConfig.urlStartWith.length);
            }
            if (key.substr(key.length - 1, 1) === '/') {
                key = key.substr(key.length - 1, 1);
            }
            if (key.length) {
                if (key.substr(0, 1) !== '/') {
                    key = '/' + key;
                }
            } else {
                key = '_default';
            }
            return key;
        }
        var key = getUrlKey(),
            name = Fm.Server.Config.AppNameInfo[key] || Fm.Server.Config.AppNameInfo['_default'],
            logo = Fm.Server.Config.AppIcoInfo[key] || Fm.Server.Config.AppIcoInfo['_default'];

        window.location = AppConfig.loginOutUrl + '?url=' + escape(window.location.href) +
            '&name=' + escape(name) +
            '&logo=' + escape(window.location.origin + AppConfig.urlStartWith + logo);
    },
    addBookmark: function (menuId, name, remark, params) {
        var mainView = application.getMainView(),
            bookView = mainView.down('sysuser_userbookmark');
        bookView.getController().addBookmark(menuId, name, remark, params);
    },
    addTestPage: function (view) {
        this._mainView.getController().addTabForTest(view)
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 表格基类
 * history:  created by 苗建龙 2015/7/6 15:03:12 
 * ***********************************************/
Ext.define("Fm.base.Grid", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.cisgrid',
    requires: [
        'Fm.ux.CisPagingToolBar'
    ],
    isPage: true,
    pageSizes: null,
    loadMask: false,
    multiColumnSort: true,
    initComponent: function () {
        var me = this,
            vm,
            bindStoreName,
            store;

        //增加页码条默认功能
        if (me.isPage) {
            try {
                try {
                    store = me.store || me.getBind().store.getValue();
                } catch (e) { }

                if (!store || store.isEmptyStore) {
                    if (me.config.bind && me.config.bind.store) {
                        bindStoreName = Ext.String.trim(me.config.bind.store).replace('{', '').replace('}', '');
                        vm = me.getViewModel();
                        store = vm.getStore(bindStoreName);
                    }
                }
                if (me.buttons && me.buttons.length > 0) {
                    Ext.apply(this, {
                        dockedItems: {
                            xtype: 'panel',
                            dock: 'bottom',
                            items: [
                                new Fm.ux.CisPagingToolBar({
                                    displayInfo: true,
                                    displayMsg: '显示{0}-{1}&nbsp;共{2}条',
                                    store: store,
                                    pageSizes: me.pageSizes || '10,50,100,500,1000,3000'
                                })
                            ],
                            buttons: me.buttons
                        }
                    });
                    me.buttons = undefined;
                } else {
                    Ext.apply(this, {
                        bbar: new Fm.ux.CisPagingToolBar({
                            displayInfo: true,
                            displayMsg: '显示{0}-{1}&nbsp;共{2}条',
                            store: store,
                            pageSizes: me.pageSizes || '10,50,100,500,1000,3000'
                        })
                    });
                }
            } catch (e) {
                Ext.log.error(e.stack);
            }
        }
        me.viewConfig = Ext.apply({
            loadMask: me.loadMask,
            //增加行样式设置功能
            getRowClass: function (record, rowIndex, rowParams, store) {
                var css = '';
                if (record._rowclass || record.data._rowclass) {
                    css += (record._rowclass || record.data._rowclass);
                }
                if (css) {
                    return css;
                }
            }
        }, me.viewConfig);

        me.callParent(arguments);
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 表格控制器基类
 * history:  created by 苗建龙 2015/5/21 13:25:24 
 * ***********************************************/
Ext.define("Fm.base.GridController", {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cisgrid',
    operationView: '',
    autoLoad: false,
    init: function () {
        var me = this,
            xtype = me.getView().xtype,
            control = {};
         
        control[xtype] = {
            afterrender: me.selfRender
        };
        control[xtype + " cispagingtoolbar"] = { beforechange: me.beforePageChange };

        me.control(control, me);

        me.callParent(arguments);
        me.initSelfEvents();
    },
    getGridStore: function () {
        var me = this,
            grid,
            store;

        if (!me.__gridStore) {
            grid = this.getView();
            store = grid.getStore();
            if (store.isEmptyStore) {
                store = grid.getBind().store.getValue();
            }
            me.__gridStore = store;
        }
        return me.__gridStore;
    },
    /**
     * 常用事件
     * dataChanged: store数据改变时触发
     */
    initSelfEvents: function () {
        var me = this,
            store = me.getGridStore();
        if (me.dataChanged) {
            store.on('datachanged', me.dataChanged, me);
        }
        if (me.dataLoaded) {
            store.on('load', me.dataLoaded, me);
        }
        //store.on('load', function () {
        //    application.mask.hide();
        //});
    },
    selfRender: function () {
        var me = this,
            store = me.getGridStore();
        if (me.autoLoad && !store.autoLoad) {
            me.refresh();
        }
    },
    //过滤
    doFilter: function (cmp) {
        var me = this,
            view = me.getView(),
            store = me.getGridStore(),
            filterConfig = Ext.clone(cmp.filterConfig),
            key = cmp.id + '_filter',
            filter,
            filterArray;

        if (!view.filterArray) {
            view.filterArray = {};
        }
        filterArray = view.filterArray;

        store.clearFilter(false);
        if (store.getDataSource().items.length < 0) {
            return;
        }

        filter = me.getFilter(filterConfig, cmp.getValue());
        filterArray[key] = filter;

        var filters = [];
        for (var f in filterArray) {
            if (filterArray[f]) {
                filters.push(filterArray[f]);
            }
        }

        var fstore;
        if (filters.length > 0) {
            fstore = store.filter(filters);
        }

        if (cmp.filterCallBack) {
            cmp.filterCallBack.call(cmp, me.getView(), store);
        }
    },
    filter: function (cmp) {
        var me = this;
        me.doFilter(cmp);
        //var fn = function () {
        //    me._filtering = true;
        //    me.doFilter(cmp);
        //    me._filtering = false;
        //}
        //setTimeout(function () {
        //    if (!me._filtering) {
        //        fn();
        //    } else {
        //        setTimeout(function () {
        //            if (!me._filtering) {
        //                fn();
        //            }
        //        }, 300);
        //    }
        //}, 300);
    },
    //判断值是否需要过滤
    isFilter: function (type, value, valueType) {
        var rel = false;
        if (valueType && valueType === 'list') {
            if (value) {
                if (!Ext.isArray(value)) {
                    value = value.split(',');
                }
                if (value.length > 0) {
                    rel = true;
                }
            }
        } else {
            switch (type) {
                case "string":
                    value = (value || '').toString();
                    if (value) {
                        rel = true;
                    }
                    break;
                case "date":
                    if (value) {
                        value = Date.parse(value);
                        if (value) {
                            rel = true;
                        }
                    }
                    break;
                case "number":
                    value = parseFloat(value);
                    if (!isNaN(value)) {
                        rel = true;
                    }
                    break;
                case "int":
                    value = parseInt(value, 10);
                    if (!isNaN(value)) {
                        rel = true;
                    }
                    break;
                default:
                    break;
            }
        }
        return rel;
    },
    //获取过滤有效值
    getFilterValue: function (type, value) {
        switch (type) {
            case "string":
                if (value === 0) {
                    value = '0';
                } else {
                    value = (value || '').toString();
                }
                break;
            case "date":
                value = Date.parse(value);
                break;
            case "number":
                value = parseFloat(value);
                break;
            case "int":
                value = parseInt(value, 10);
                break;
            default:
                break;
        }
        return value;
    },
    getFilterListValue: function (type, value) {
        var me = this;
        if (value) {
            if (!Ext.isArray(value)) {
                value = value.split(',');
            }
            var _value = [];
            for (var i = 0; i < value.length; i++) {
                if ((type === 'int' || type === 'number')) {
                    if ((value || value === 0)) {
                        _value.push(me.getFilterValue(type, value[i]));
                    }
                } else {
                    if (value) {
                        _value.push(me.getFilterValue(type, value[i]));
                    }
                }
            }

            if (_value.length > 0) {
                return _value;
            }
        }
        return null;
    },
    //获取Filter      return Ext.util.Filter || undefined
    getFilter: function (filterConfig, value) {
        var me = this,
            filter;
        if (filterConfig.type && filterConfig.type === 'filter') {
            filterConfig.filter._cmpValue = value;
            return filterConfig.filter;
        }
        if (!Ext.isArray(filterConfig)) {
            filterConfig = [filterConfig];
        }
        var filterArray = Ext.Array.filter(filterConfig, function (item) {
            return me.isFilter(item.type, value, item.valueType);
        });
        if (filterArray.length > 1) {
            var values = [];
            var valueIsList = false;
            for (var i = 0; i < filterArray.length; i++) {
                if (filterArray[i].valueType === 'list') {
                    var _value = me.getFilterListValue(filterArray[i].type, value);
                    valueIsList = _value.length > 1;
                    if (_value.length === 1) {
                        _value = _value[0];
                        delete filterArray[i].valueType;
                    }
                    values.push(_value);
                } else {
                    values.push(me.getFilterValue(filterArray[i].type, value));
                }
            }
            if (valueIsList) {
                filter = {
                    filterFn: function (record) {
                        for (var i = 0; i < filterArray.length; i++) {
                            if (filterArray[i].valueType === 'list') {
                                if (Ext.Array.findBy(values[i], function (v) {
                                    return Fm.Common.Util.comp(
                                           filterArray[i].operator,
                                           me.getFilterValue(filterArray[i].type, record.data[filterArray[i].property]),
                                           v)
                                })) {
                                    return true;
                                }
                            } else {
                                if (Fm.Common.Util.comp(
                                    filterArray[i].operator,
                                    me.getFilterValue(filterArray[i].type, record.data[filterArray[i].property]),
                                    values[i])
                               ) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }
                }
            } else {
                filter = {
                    filterFn: function (record) {
                        for (var i = 0; i < filterArray.length; i++) {
                            if (Fm.Common.Util.comp(
                                    filterArray[i].operator,
                                    me.getFilterValue(filterArray[i].type, record.data[filterArray[i].property]),
                                    values[i])
                               ) {
                                return true;
                            }
                        }
                        return false;
                    }
                }
            }
        } else if (filterArray.length === 1) {
            var _temp = filterArray[0];
            var valueIsList = false;
            if (_temp.valueType === 'list') {
                var _value = me.getFilterListValue(_temp.type, value);
                valueIsList = _value.length > 1;
                if (_value.length === 1) {
                    _value = _value[0];
                    delete _temp.valueType;
                }
                value = _value;
            } else {
                value = me.getFilterValue(_temp.type, value);
            }
            if (valueIsList) {
                filter = {
                    filterFn: function (record) {
                        if (Ext.Array.findBy(value, function (v) {
                            return Fm.Common.Util.comp(
                                    _temp.operator,
                                    me.getFilterValue(_temp.type, record.data[_temp.property]),
                                    v)
                        })) {
                            return true;
                        }
                    }
                }
            } else {
                filter = {
                    filterFn: function (record) {
                        return Fm.Common.Util.comp(
                            _temp.operator,
                            me.getFilterValue(_temp.type, record.data[_temp.property]),
                            value)
                    }
                }
            }
        }
        return filter;
    },
    /* *
     * 获取查询参数 验证通过返回true 否则返回false 提示错误
     * 子类重写
     */
    getRefreshParams: function () {
        return {};
    },
    beforePageChange: function () {
        var me = this;
        //分页改变不需要重复查询分页总条数
        me.getGridStore().isRequiresPage = false;
        return me.addParams();
    },
    addParams: function () {
        var params = this.getRefreshParams();
        if (params !== false) {
            this.getGridStore().outParams = params;
            //Ext.apply(this.getGridStore().outParams, params);
            //console.dir(this.getGridStore().outParams);
            //application.mask.show();
            return true;
        }
        return false;
    },
    refresh: function () {
        //点击搜索需要重复查询分页总条数
        this.getGridStore().isRequiresPage = true;
        this.refreshByParams();
    },
    refreshByParams: function (params) {
        var me = this,
            isCanRefresh = me.addParams();
        if (isCanRefresh !== false) {
            setTimeout(function () {
                //me.getGridStore().load(params);
                //解决检索时从第一页开始查的问题
                me.getGridStore().loadPage(1, params);
            }, 10);
        }
    }
});

/* ***********************************************
 * author :  苗建龙
 * function: 主框架
 * history:  created by 苗建龙 2015/7/31 13:54:07 
 * ***********************************************/
Ext.define('Fm.base.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    /**
     * main render后执行
     */
    mainRender: function () {
        var me = this;

        Ext.History.init();
        Ext.History.on('change', function (code) {
            var mid = code;
            if (!mid) {
                mid = 0;
            }
            me.openNewTab(mid);
        });

        var code = Ext.History.getToken();
        if (!code || code.toString() === '0') {
            code = AppConfig.defaultMenuId;
        }

        if (code) {
            var exp = setInterval(function () {
                if (application) {
                    clearInterval(exp);
                    me.openNewTab(code);
                }
            }, 30);
        }
    },
    deSelectMenuById: function (record) {
        var me = this,
            treelist = me.getView().down('treelist');

        if (record) {
            treelist.getItem(record).updateSelected(false);
        }
    },
    selectMenuById: function (mid) {
        var me = this,
            treelist = me.getView().down('treelist'),
            treelistStore = treelist.getStore(),
            record;

        record = treelistStore.getAt(treelistStore.findBy(function (record) {
            return record.get('Id') == mid;
        }));

        if (record) {
            treelist.getItem(record).updateSelected(true);
            me.lastSelectedRecord = record;
        }
    },
    /**
     * 标签切换
     */
    tabChange: function (v, tab) {
        var me = this,
            view = me.getView(),
            msgarea;

        if (tab.menuId !== null && tab.menuId !== undefined) {
            var code = tab.menuId;
            Ext.History.add(code);
            try {
                var msgarea = view.down('container[msgarea=msgarea]');
                msgarea.removeAll(true);
                if (tab.msgItems) {
                    msgarea.add(tab.msgItems);
                }
            } catch (e) { }
            return false;
        }
    },

    /**
     * 左菜单样式切换
     */
    toggleMenu: function (btn) {
        var me = this,
            treelist = me.getView().down('treelist'),
            ct = treelist.ownerCt;

        if (me.pressed === undefined) {
            me.pressed = AppConfig.Design.Menu.Pressed;
        }

        Ext.suspendLayouts();
        treelist.setMicro(!me.pressed);
        if (me.pressed) {
            ct.setWidth(AppConfig.Design.Menu.MaxWidth);
            btn.setIconCls('fa fa-angle-left');
        } else {
            ct.setWidth(AppConfig.Design.Menu.MinWidth);
            btn.setIconCls('fa fa-angle-right');
        }
        Cookie.set(AppConfig.cookieStartWith + "main-left-panel-micro", !me.pressed, 365);

        me.pressed = !me.pressed;
        if (Ext.isIE8) {
            this.repaintList(treelist, !me.pressed);
        }
        //触发多分辨率兼容更新
        Ext.GlobalEvents.fireEvent('resize');
        Ext.resumeLayouts(true);
    },

    /**
     * 主框架大小调整事件
     */
    mainResize: function () {
        Ext.util.CSS.removeStyleSheet('x-treelist-item-floated-height');
        Ext.util.CSS.createStyleSheet(
            '.x-treelist-nav .x-treelist-item-floated .x-treelist-container{max-height:' + (this.getView().getHeight() - 36) + 'px;overflow-y:auto;}',
            'x-treelist-item-floated-height');
        return true;
    },
    /**
     * 根据菜单编号打开一个标签
     */
    openNewTab: function (menuId, data) {
        var me = this,
            view = me.getView(),
            menuData,
            main = view.down(me.xtypeStartWith + "-maintab"),
            treelist = view.down(me.xtypeStartWith + '-mainleft').down('treelist'),
            store = treelist.getStore(),
            record;

        me.deSelectMenuById(me.lastSelectedRecord);

        if (menuId.toString() === '0') {
            main.setActiveTab(Ext.getCmp('main_tab_0'));
            return false;
        }

        menuData = Ext.Array.findBy(Fm.Server.Menus, function (item) {
            return item.Id.toString() === menuId.toString();
        });

        if (!menuData) {
            //Fm.msg.error('没有权限查看此页面。');
            return false;
        }

        if (menuData.ParentId !== 0) {
            record = store.getAt(store.findBy(function (record) {
                return record.get('Id') == menuData.ParentId;
            }));

            if (record) {
                treelist.getItem(record).expand();
            }
        }

        me.selectMenuById(menuId);

        var id = 'main_tab_' + menuData['Id'];

        var panel = Ext.getCmp(id);
        try {
            if (!panel) {
                application.globalMask.show();
                setTimeout(function () {
                    try {
                        panel = Ext.create(menuData['MenuView'], {
                            id: id,
                            menuId: menuId,
                            closable: true,
                            //glyph: menuData['glyph'],
                            iconCls: menuData['iconCls'],
                            closeAction: 'destroy',
                            autoDestroy: true,
                            title: menuData['Name'],
                            cls: 'cis-panel-default',
                            frame: false,
                            border: false,
                            maskParam: (menuData['ViewParams'] || {}).maskParam,
                            viewParams: menuData['ViewParams'],
                            listeners: {
                                afterrender: function (v) {
                                    application.globalMask.hide();
                                    if (data && panel[data.event]) {
                                        panel[data.event].call(panel, data.params)
                                    }
                                }
                            }
                        });
                    } catch (e) {
                        Ext.log.error(e.stack);
                    }

                    if (panel) {
                        main.add(panel);
                        main.setActiveTab(panel);
                    }
                }, 10);
            } else {
                main.setActiveTab(panel);
                if (data && panel[data.event]) {
                    panel[data.event].call(panel, data.params)
                }
            }
        } catch (e) {
            Ext.log.error(e.stack);
        }
    },

    /**
     * 左菜单重新渲染
     */
    repaintList: function (treelist, microMode) {
        treelist.getStore().getRoot().cascadeBy(function (node) {
            var item, toolElement;

            item = treelist.getItem(node);

            if (item && item.isTreeListItem) {
                if (microMode) {
                    toolElement = item.getToolElement();

                    if (toolElement && toolElement.isVisible(true)) {
                        toolElement.syncRepaint();
                    }
                }
                else {
                    if (item.element.isVisible(true)) {
                        item.iconElement.syncRepaint();
                        item.expanderElement.syncRepaint();
                    }
                }
            }
        });
    },
    addTabForTest: function (viewName) {
        var me = this,
            view = me.getView(),
            main = view.down(me.xtypeStartWith + "-maintab");

        var id = 'main_tab_' + viewName.replace(/./g, '-');

        var panel = Ext.getCmp(id);
        try {
            if (!panel) {
                application.globalMask.show();
                setTimeout(function () {
                    try {
                        panel = Ext.create(viewName, {
                            id: id,
                            closable: true,
                            closeAction: 'destroy',
                            autoDestroy: true,
                            title: viewName,
                            cls: 'cis-panel-default',
                            frame: false,
                            border: false,
                            isTest:true
                        });
                    } catch (e) {
                        Ext.log.error(e.stack);
                    }

                    if (panel) {
                        main.add(panel);
                        main.setActiveTab(panel);
                    }
                }, 10);
                application.globalMask.hide();
            } else {
                main.setActiveTab(panel);
            }
        } catch (e) {
            Ext.log.error(e.stack);
        }
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/5/21 13:24:11 
 * ***********************************************/
Ext.define("Fm.base.Model", {
    extend: 'Ext.data.Model'//,
    //proxy: {
    //    type: 'ajax',
    //    actionMethods: {
    //        create: 'POST',
    //        read: 'POST',
    //        update: 'POST',
    //        destroy: 'POST'
    //    },
    //    reader: {
    //        type: 'json',
    //        rootProperty: 'Result',
    //        successProperty: 'IsSuccess',
    //        messageProperty: 'ErrMsg',
    //        totalProperty: "TotalCount"
    //    },
    //    limitParam: "PageSize",
    //    pageParam: "PageNum",
    //    startParam: 'StartIndex'
    //},
    //getUrl: function (key) {
    //    return this.getProxy().api[key]
    //}
});
/* ***********************************************
 * author :  苗建龙
 * function: 搜索面板基类
 * history:  created by 苗建龙 2015/10/12 9:20:39 
 * ***********************************************/
Ext.define("Fm.base.SearchForm", {
    extend: 'Ext.form.Panel',
    alias: 'widget.base_searchform',
    modelValidation: true,
    bodyCls: 'cis-searh-panel',
    configKey: '',
    searchHandler: 'refresh',
    solutionConfig: [
        { index: 0, solutionKey: 1, conWidth: 800, minWidth: 0, maxWidth: 999 },
        { index: 1, solutionKey: 2, conWidth: 1000, minWidth: 1000, maxWidth: 1199 },
        { index: 2, solutionKey: 3, conWidth: 1200, minWidth: 1200, maxWidth: 10000 }
    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    getSolutionInfo: function (width) {
        var me = this,
            isEdit = !!me.record,
            items,
            mainWidth = width || Ext.getCmp('ViewPortCoreTab').getWidth();
        return Ext.Array.findBy(me.solutionConfig, function (item) {
            return mainWidth >= item.minWidth && mainWidth <= item.maxWidth;
        });
    },
    initComponent: function () {
        var me = this,
            isEdit = !!me.record,
            soInfo = me.getSolutionInfo();

        me._layouting = true;

        if (me.record) {
            me._setLayoutConfig(me.record);
            me.layoutConfig = me.record;
        } else {
            if (me.configs) {
                me.layoutConfigs = me.configs;
            } else {
                me.layoutConfigs = appFactory.Config.getFormItems(me.configKey);
            }
            for (var i = 0; i < me.layoutConfigs.length; i++) {
                me._setLayoutConfig(me.layoutConfigs[i]);
            }
            me.layoutConfig = me.layoutConfigs[soInfo.index];
        }

        me.height = me.layoutConfig.minHeight;

        me.items = [{
            xtype: 'panel',
            selfType: 'itemsContainer',
            layout: {
                type: 'table',
                columns: me.layoutConfig.col,
                itemCls: 'x_seachform_item'
            },
            width: me.layoutConfig.width,
            padding: 3,
            defaults: {
                margin: '3 0',
                width: 186,
                labelAlign: "right",
                labelWidth: 66
            },
            items: me.layoutConfig.items,
            dockedItems: [{
                dock: 'right',
                xtype: 'toolbar',
                layout: {
                    type: 'hbox',
                    align: 'middle'
                },
                width: 130,
                padding: '5 0 0 0',
                style: {
                    zIndex: 0
                },
                cls: 'cis-searh-panel',
                items: [{
                    margin: '0 0 0 5',
                    width: 70,
                    xtype: 'button',
                    text: '检索',
                    listeners: {
                        click: me.searchHandler
                    },
                    disabled: isEdit,
                    optype: 'search'
                }, {
                    width: 22,
                    margin: '0 0 0 5',
                    xtype: 'button',
                    hidden: !me.layoutConfig.isShowToggleBtn,
                    iconCls: 'fa fa-arrow-down cis-searchform-expand-btn',
                    optype: 'toggle',
                    style: {
                        backgroundColor: '#368ecc'
                    },
                    listeners: {
                        click: me._toggleHeight,
                        scope: me
                    }
                }]
            }]
        }, {
            xtype: 'container',
            flex: 1
        }];

        me.callParent(arguments);

        if (!isEdit && !AppConfig.Design.FixedResolution) {
            me.on('resize', me._updateLayout, me);
            me.on('afterlayout', function () {
                me._layouting = false;
            }, me);
        }
    },
    _toggleHeight: function () {
        var me = this,
            isEdit = !!me.record;

        if (!isEdit && !AppConfig.Design.FixedResolution) {
            me.un('resize', me._updateLayout, me);
        }
        var layoutConfig = me.layoutConfig,
            layout = me.down('panel[selfType=itemsContainer]').getLayout(),
            minHeight = layoutConfig.minHeight,
            maxHeight = layout.table.getHeight() + 6,
            isExpand;

        if (minHeight > maxHeight) {
            minHeight = maxHeight;
        }
        isExpand = me.getHeight() !== minHeight;

        Ext.suspendLayouts();

        me.setHeight(isExpand ? minHeight : maxHeight);
        me.down('button[optype=toggle]').setIconCls(isExpand ? 'fa fa-arrow-down cis-searchform-expand-btn' : 'fa fa-arrow-up cis-searchform-expand-btn');

        Ext.resumeLayouts(true);
        if (!isEdit && !AppConfig.Design.FixedResolution) {
            me.on('resize', me._updateLayout, me);
        }
    },
    _updateLayout: function () {
        if (this._layouting || !this.configKey) {
            return;
        }
        this._layouting = true;

        var me = this,
            container = me.down('panel[selfType=itemsContainer]'),
            layout = container.getLayout(),
            soInfo = me.getSolutionInfo(me.getWidth());

        if (me.layoutConfig.resolution === soInfo.solutionKey) {
            return;
        }

        me.layoutConfig = me.layoutConfigs[soInfo.index];

        Ext.suspendLayouts();

        layout.setColumns(me.layoutConfig.col);

        Ext.Array.each(Ext.Array.filter(container.items.items, function (item) {
            return item.xtype === 'container';
        }), function (item) {
            container.remove(item);
        });

        container.setWidth(soInfo.conWidth);
        me.setHeight(me.layoutConfig.minHeight);

        var btnToggle = me.down('button[optype=toggle]');
        btnToggle.setHidden(!me.layoutConfig.isShowToggleBtn);

        Ext.resumeLayouts(true);
    },
    _setLayoutConfig: function (config) {
        var me = this,
            isEdit = !!me.record,
            itemLength = 0;

        Ext.Array.each(config.items, function (item, index) {
            var length = item.colspan || 1;
            if ((itemLength + 1) % config.col === 0) {
                length = 1;
            }
            itemLength += length;

            //自动计算labelWidth
            var trueItem = isEdit ? (item.items ? item.items[0] : item) : item;
            var _fl = (trueItem.fieldLabel || '').toString();
            var sLength = _fl.trim().length + (_fl.match(/[^x00-xff]/g) || []).length;
            if (sLength > 8) {
                trueItem.labelWidth = 66 + (sLength - 8) * 6;
            }

            //增加键盘enter事件
            item.labelPad = 0;
            item.maxHeight = 25;
            var setEventFn = function (control) {
                if (!control.listeners) {
                    control.listeners = {};
                }
                control.listeners['specialkey'] = function (field, e) {
                    if (e.getKey() == e.ENTER) {
                        var form = field.up('base_searchform').down('button[optype=search]').fireEvent('click');
                    }
                }
                control.labelPad = 0;
            }
            if (item.items && item.items.length > 0) {
                Ext.Array.each(item.items, function (control) {
                    control.margin = 0;
                    setEventFn(control);
                });
            } else {
                setEventFn(item);
            }
        });

        var maxRow = Math.ceil(itemLength / config.col);
        config.minHeight = config.row * (isEdit ? 31 : 30) + (isEdit ? 7 : 6);
        config.width = Ext.Array.findBy(me.solutionConfig, function (item) {
            return item.solutionKey === config.resolution;
        }).conWidth;
        config.isShowToggleBtn = maxRow > config.row;
    }
});
/* ***********************************************
 * author :  苗建龙
 * function: Store基类
 * history:  created by 苗建龙 2015/5/21 13:23:18 
 * ***********************************************/
Ext.define("Fm.base.Store", {
    extend: 'Ext.data.Store',
    outParams: {},
    pageSize: Fm.Server.Config.PageRowCount || 10,
    autoLoad: false,
    //autoDestroy: true,
    isRequiresPage: true,
    latestTotalCount: 0,
    proxy: {
        type: 'ajax',
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'Result',
            successProperty: 'IsSuccess',
            messageProperty: 'ErrMsg',
            totalProperty: "TotalCount"
        },
        limitParam: "PageSize",
        pageParam: "PageNum",
        startParam: 'StartIndex',
        timeout: AppConfig.ajaxTimeOut
    },
    listeners: {
        beforeload: function (store, opration, opt) {
            var me = this;

            me.lastTotalCount = store.totalCount;
            if (me.isRequiresPage) {
                me.outParams.TotalCount = 0;
            } else {
                try {
                    me.outParams.TotalCount = store.totalCount || 0;
                } catch (e) { }
            }
            Ext.apply(store.proxy.extraParams, me.outParams);

            setTimeout(function () {
                var proxy = store.getProxy();
                if (proxy) {
                    var getCountUrl = proxy.api.readTotalCount;
                    if (getCountUrl) {
                        if (me.isRequiresPage) {
                            store.fireEvent('beforeUpdatePageInfo');
                            Ext.Ajax.request({
                                url: getCountUrl,
                                method: 'post',
                                callback: function (options, success, response) {
                                    if (success) {
                                        var responseJson = Ext.JSON.decode(response.responseText);
                                        store.totalCount = responseJson.Result;
                                        store.latestTotalCount = responseJson.Result;
                                        //beforeload load 事件执行完之后都执行这个方法
                                        me.updateTotalCount();
                                        store.fireEvent('updatePageInfo');
                                    }
                                },
                                params: store.proxy.extraParams
                            });
                        } else {
                            store.totalCount = me.lastTotalCount;
                        }
                    }
                }
            }, 1000);
            //store.removeAll();
        },
        load: function (store) {
            var me = this;
            //beforeload load 事件执行完之后都执行这个方法
            var getCountUrl = store.getProxy().api.readTotalCount;
            if (getCountUrl) {
                me.updateTotalCount();
            }

        }
    },
    /*silent : Boolean (optional)
        Pass true to prevent the clear event from being fired.
        This method is affected by filtering.
        Defaults to: false
    */
    clearAll: function (silent) {
        this.outParams = {};
        this.proxy.extraParams = {};
        this.removeAll(silent || false);
    },

    //beforeload load 事件执行完之后都执行这个方法，更新总数
    updateTotalCount: function () {
        var me = this;

        me.totalCount = me.latestTotalCount;

    }
});
///* ***********************************************
// * author :  苗建龙
// * function: 通知
// * history:  created by FeiLong 2015/5/11 16:31:57 
// * ***********************************************/
Ext.ns('Fm').msg = {
    show: function (msg, title) {

        setTimeout(function () {
            Ext.toast({
                title: title,
                html: msg,
                closable: true,
                align: 'br',
                frame: false,
                slideInDuration: 300,
                minHeight: 80,
                width: 400,
                minWidth: 400
            });
        }, 50);
    },
    info: function (msg, title) {
        Fm.msg.show('<span>' + (msg || '') + '</span>', title || '提示');
    },
    notify: function (msg, title) {
        Fm.msg.show('<span>' + (msg || '') + '</span>', title || '通知');
    },
    warn: function (msg, title) {
        Fm.msg.show('<span style="color:rgb(246, 252, 5)">' + (msg || '') + '</span>', title || '警告');
    },
    error: function (msg, title) {
        if (msg) {
            Fm.msg.show('<span style="color:#ff0000">' + (msg || '') + '</span>', title || '错误');
        }
    },
    devError: function (msg) {
        if (AppConfig.isDev && !AppConfig.isCompile) {
            Ext.log.error(msg);
            //Fm.msg.show('<span style="color:#ff0000">' + (msg || '') + '</span>', title || '代码异常');
        }
    }
};

Ext.ns('Fm').Array = {
    /**
     * 苗建龙
     * 模拟异步多线程循环
     * arr: 原始数组 
     * eachFn: 循环方法 参数 1:单条数据 2:下标
     * backFn: 循环完成回调函数
     */
    eachSync: function (arr, eachFn, backFn, sCount) {
        //数组总长度
        var arrLength = arr.length;
        //单次循环次数
        var singleCount = sCount || 200;
        //完成线程数
        var compLength = 0;
        //总线程数
        var allLengh = Math.ceil(arrLength / singleCount);
        //是否跳出循环
        var isBreak = false;

        //小于1不循环
        if (arrLength < 1) {
            if (backFn) {
                backFn();
            }
            return;
        }
        //总长度不足一次或只有一次的情况 直接循环
        if (arrLength <= singleCount) {
            for (var i = 0; i < arrLength; i++) {
                var rel = eachFn(arr[i], i);
                if (rel === false) {
                    break;
                }
            }
            if (backFn) {
                backFn();
            }
            return;
        }

        //单个线程循环
        var runFn = function (theardIndex) {
            var _s = theardIndex * singleCount;
            var _e = (theardIndex === allLengh - 1) ? arrLength : (_s + singleCount);
            for (var i = _s; i < _e; i++) {
                var rel = eachFn(arr[i], i);
                if (isBreak || rel === false) {
                    isBreak = true;
                    break;
                }
            }
        }

        //线程函数
        var startFn = function (theardIndex) {
            return function () {
                runFn(theardIndex);
                compLength++;
            }
        };

        if (Ext && Ext.Deferred) {
            var fns = [];
            for (var i = 0; i < allLengh; i++) {
                fns.push(startFn(i))
            }
            Ext.Deferred.parallel(fns).then(backFn || function () { });
        } else {
            //开启线程
            for (var i = 0; i < allLengh; i++) {
                setTimeout(startFn(i), i * 5);
            }

            //监听 完成后调用回调函数
            var listen = setInterval(function () {
                if (compLength === allLengh && compLength != 0) {
                    clearInterval(listen);
                    if (backFn) {
                        //setTimeout(function () {
                        backFn();
                        //}, 50);
                    }
                }
            }, 50);
        }
    },

    //数组分组
    group: function (arr, field) {
        var groups = {};
        Ext.Array.forEach(arr, function (item) {
            if (groups[item[field]]) {
                groups[item[field]].push(item);
            } else {
                groups[item[field]] = [item];
            }
        });
        return groups;
    },

    /**
     * 何泽立
     * 建立层级数据列表
     * arr: 原始数组 
     * field: 节点标识
     * fieldParebt: 父节点标识
     * root: 根节点
     * istree: 是否添加leaf节点标记(判断节点是否为叶子节点 leaf)
     * checkfield: 判断节点是否被选中(通过checkfield列设置节点checked是否选中属性)
     * fn: 装饰方法 传入依次遍历的节点，返回false移除该节点
     */
    tier: function (arr, field, fieldParent, root, istree, checkfield, fn) {
        var getChild = function (item) {
            var nodes = [];
            for (var i = 0; i < arr.length; i++) {
                var node = arr.shift();
                if (item[field] === node[fieldParent]) {
                    nodes.push(node); i--;
                } else {
                    arr.push(node);
                }
            }
            for (var i = 0; i < nodes.length; i++) {
                getChild(nodes[i]);
                if (fn && fn(nodes[i]) === false) {
                    nodes = Ext.Array.removeAt(nodes, i);
                    i--;
                }
            }
            if (checkfield) {
                item.checked = item[checkfield];
            }
            if (nodes.length > 0) {
                item.children = nodes;
            }
            else if (istree) {
                item.leaf = true;
            }
        }
        getChild(root);
        return root;
    }
};
///* ***********************************************
// * author :  苗建龙
// * function: 
// * history:  created by FeiLong 2015/5/11 16:21:57 
// * history:  update by FeiLong 2017/3/20 16:21:57  全部代码更新为面向对象模式 增加应用扩展性、降低耦合度

//数据处理类
function fmDataFactory(config) {
    //数据命名空间前缀
    this.nsStartWith = config.nsStartWith;
}

fmDataFactory.prototype.getDatas = function (key, fn) {
    return Ext.ns(this.nsStartWith)[key];
}

//根据key获取简单DataStore
//isAddAll:是否在第一项插入 ‘全部’选项
//插入数据 默认[{ "Value": -1, "Text": "全部" }]
fmDataFactory.prototype.getDataStore = function (key, isAddAll, addRecord) {
    var me = this,
        datas = me.getDatas(key);

    if (!datas) {
        Fm.msg.devError("[fmDataFactory-getDataStore]" + me.nsStartWith + ": " + key + " 不存在。");
        datas = [];
    }
    var _data = [];
    if (isAddAll) {
        _data = addRecord || [{ "Value": -1, "Text": "全部" }]
    }
    _data = Ext.Array.push(_data, Ext.Array.filter(datas, function (item) {
        return item.IsAlloted === true;
    }));
    var _tempDataStore = Ext.create('Ext.data.Store', {
        fields: ['Value', 'Text'],
        data: _data
    });
    return _tempDataStore;
}

fmDataFactory.prototype.getAllDataStore = function (key, isAddAll, addRecord) {
    var me = this,
        datas = me.getDatas(key);
    if (!datas) {
        Fm.msg.devError("[fmDataFactory-getAllDataStore]" + me.nsStartWith + ": " + key + " 不存在。");
        datas = [];
    }
    var _data = [];
    if (isAddAll) {
        _data = addRecord || [{ "Value": -1, "Text": "全部" }]
    }
    _data = Ext.Array.push(_data, datas);
    var _tempDataStore = Ext.create('Ext.data.Store', {
        fields: ['Value', 'Text'],
        data: _data
    });
    return _tempDataStore;
}

//根据code判断用户是否拥有功能权限，返回 true/false 
//注：兼容方法 2.0 移除
fmDataFactory.prototype.judgePrivilege = function (code) {
    Ext.log.warn('此方法(appFactory.Data.judgePrivilege)不建议继续使用，替代：fmService.Sys.isPermission(key)');
    return Ext.Array.findBy(this.getDatas("Privileges"), function (item) {
        return item.Value === code && item.IsAlloted;
    }) != null;
}


//配置处理类
function fmUiFactory(config) {
    //配置命名空间前缀
    this.nsStartWith = config.nsStartWith;
}

//根据key获取全部配置项
fmUiFactory.prototype.getAllItems = function (key) {
    var me = this,
        obj = Ext.ns(key);

    if (typeof obj !== 'function') {
        obj = Ext.ns(key);
    }
    if (typeof obj !== 'function') {
        obj = Ext.ns(me.nsStartWith + '.' + key);
    }

    if (typeof obj === 'function') {
        obj = obj();
        if (AppConfig.isDev === 1 && typeof obj !== 'string') {
            Ext.Array.forEach(obj, function (item) {
                if (Ext.Array.filter(obj, function (child) {
                    return item.configIndex == child.configIndex;
                }).length > 1) {
                    Fm.msg.devError(key + ':出现重复configIndex，值为：' + item.configIndex);
                }
                if (!(item.header || item.text || item.configName || item.fieldLabel)) {
                    Fm.msg.devError(key + ':configIndex为' + item.configIndex + '的配置项缺少名称(configName)');
                }
            })
        }
        return obj;
    }
    else {
        Fm.msg.devError('配置信息出现异常！请检查拼写');
        return [];
    }
}

//根据key获取显示项的索引
fmUiFactory.prototype.getConfigs = function (key) {
    var viewConfig = Ext.ns("Fm.ViewConfig");
    if (viewConfig[key]) {
        return viewConfig[key]();
    }
    var _key = key;
    if (this.nsStartWith) {
        _key = this.nsStartWith + '.' + key;
    }
    if (viewConfig[_key]) {
        return viewConfig[_key]();
    }
    return null;
}

//根据key获取显示状态的配置项
fmUiFactory.prototype.getShowItems = function (key) {
    return this.getGridItems(key);
}

//获取列表配置项
fmUiFactory.prototype.getGridItems = function (key) {
    var me = this,
        allItems = me.getAllItems(key),
        configs = me.getConfigs(key),
        showItems = [];

    if (configs) {
        for (var i = 0; i < configs.length; i++) {
            var obj = Ext.Array.findBy(allItems, function (item, _i) {
                return item.configIndex == configs[i].index;
            });
            if (obj) {
                me.handlerGridConfig(obj, configs[i]);
                showItems.push(obj);
            }
        }
    } else {
        Ext.Array.forEach(allItems, function (item) {
            if (!item.configHidden) {
                showItems.push(item);
            }
        })
    }

    return showItems;
}

//获取查询配置项
fmUiFactory.prototype.getFormItems = function (key) {
    var me = this,
        allItems = me.getAllItems(key),
        configs = me.getConfigs(key),
        showItems = [],
        res = [];

    if (configs) {
        Ext.Array.forEach(configs, function (config) {
            var obj = { resolution: config.resolution, col: config.col, row: config.row, items: [] };
            Ext.Array.forEach(config.items, function (cItem) {
                var cmp = Ext.Array.findBy(allItems, function (item) {
                    return item.configIndex == cItem.index;
                });
                if (cItem.index === -1) {
                    cmp = me.getFormEmptyItem(cItem.colspan);
                } else {
                    if (!cmp) {
                        cmp = me.getFormEmptyItem(cItem.colspan);
                    }
                }
                obj.items.push(cmp);
            })
            res.push(obj);
        })
    } else {
        Ext.Array.forEach(allItems, function (item) {
            if (!item.configHidden) {
                showItems.push(item);
            }
        })
        res = [
            { resolution: 1, col: 3, row: Math.ceil(showItems.length / 3) > 3 ? 3 : Math.ceil(showItems.length / 3), items: showItems },
            { resolution: 2, col: 4, row: showItems.length > 4 ? 2 : 1, items: showItems },
            { resolution: 3, col: 5, row: showItems.length > 5 ? 2 : 1, items: showItems }
        ];
    }
    return res;
}

fmUiFactory.prototype.getFormEmptyItem = function (colspan) {
    colspan = colspan || 1;
    return {
        xtype: 'fieldcontainer',
        style: { backgroundColor: 'transparent' },
        colspan: colspan,
        configIndex: -1,
        height: 20,
        width: 180 * colspan
    };
}

//grid数据格式处理
fmUiFactory.prototype.handlerGridConfig = function (obj, config) {
    if (config.width) {
        obj.width = config.width;
        obj.flex = undefined;
    }
    if (config.exportIsCount) {
        obj.exportIsCount = config.exportIsCount;
    }
    if (config.datatype) {
        switch (config.datatype) {
            case 'Money':
                obj.renderer = Fm.Common.Util.moneyRender('f00');
                obj.align = 'right';
                break;
            case 'Date':
                obj.renderer = Fm.Common.Util.dateTextRender();
                break;
        }
    }
}


function fmCommonFactory(config) {
    return {
        Data: new fmDataFactory({ nsStartWith: (config.appName || AppConfig.appName) + ".Server.Datas" }),
        Config: new fmUiFactory({ nsStartWith: (config.appName || AppConfig.appName) + ".Config" })
    };
}

var appFactory = fmCommonFactory({ appName: null });
///* ***********************************************
// * author :  苗建龙
// * function: 
// * history:  created by FeiLong 2015/5/11 16:21:57 
// * ***********************************************/
function FmUtil() {

}

//日期
FmUtil.prototype.dateRender = function (format, color) {
    var me = this,
        format = format || "Y-m-d";
    return function (date) {
        var _temp;
        if (!date) {
            return '';
        }
        if (Ext.isDate(date)) {
            _temp = date;
        } else {
            var _temp = me.convertISOStrToDate(date);

            if (!Ext.isDate(_temp)) {
                return '';
            }
        }
        var value = Ext.Date.format(_temp, format);
        if (color) {
            return "<span style='color:#" + color + "'>" + value + "</span>";
        }
        return value;
    }
}

//月份
FmUtil.prototype.dateMonthRender = function () {
    return this.dateRender("Y-m");
}

//时间
FmUtil.prototype.dateTimeRender = function () {
    return this.dateRender("Y-m-d H:i:s");
}

//时间
FmUtil.prototype.dateTextRender = function () {
    return this.dateRender("Y-m-d H:i:s");
}

//为了兼容IE8，对日期原字符串做处理
FmUtil.prototype.dateTransfer = function (d) {
    return this.convertISOStrToDate(d);
}

//链接
FmUtil.prototype.linkRender = function (v) {
    if (!v) {
        return "";
    }
    else {
        return "<a href='" + v + "' target='_blank'>" + v + "</a>";
    }
}

//bool 是 否
FmUtil.prototype.booleanRender = function (value, p, record) {
    return (!value || value === '0') ? "否" : "是";
}

//颜色
FmUtil.prototype.colorRender = function (color) {
    return function (v) {
        if (v) {
            return "<span style='color:#" + color + "'>" + v + "</span>";
        }
        return "";
    }
}

/*2015-06-04T23:59:59 转换为 2016/06/04 23:59:59 兼容IE8*/
FmUtil.prototype.convertISOStrToDate = function (dateString) {
    if (!dateString) {
        return null;
    }
    return new Date(dateString.replace(/-/g, '/').replace(/T|Z/g, ' ').trim());
}

//钱
FmUtil.prototype.moneyRender = function (color, accuracy) {
    var moneyAccuracy = accuracy || parseInt(Fm.Server.Config.MoneyAccuracy, 10) || 2;
    var format = '0.';
    for (var i = 0; i < moneyAccuracy; i++) {
        format += '0';
    }
    //color = color || 'ff0000';
    if (color) {
        return function (obj) {
            obj = Ext.util.Format.round(obj, moneyAccuracy);
            return "<span style='color:#" + color + "'>￥" + Ext.util.Format.number(obj, format) + "</span>";
        }
    } else {
        return function (obj) {
            obj = Ext.util.Format.round(obj, moneyAccuracy);
            return "￥" + Ext.util.Format.number(obj, format);
        }
    }
}

//钱 允许显示空
FmUtil.prototype.moneyForAllowNullRender = function (color, accuracy) {
    var moneyAccuracy = accuracy || parseInt(Fm.Server.Config.MoneyAccuracy, 10) || 2;
    var format = '0.';
    for (var i = 0; i < moneyAccuracy; i++) {
        format += '0';
    }
    //color = color || 'ff0000';
    if (color) {
        return function (obj) {
            if (obj === null || obj === undefined || obj === 0) {
                return '';
            }
            obj = Ext.util.Format.round(obj, moneyAccuracy);
            return "<span style='color:#" + color + "'>￥" + Ext.util.Format.number(obj, format) + "</span>";
        }
    } else {
        return function (obj) {
            if (obj === null || obj === undefined || obj === 0) {
                return '';
            }
            obj = Ext.util.Format.round(obj, moneyAccuracy);
            return "￥" + Ext.util.Format.number(obj, format);
        }
    }
}

//百分号
FmUtil.prototype.percentRender = function () {
    var moneyAccuracy = parseInt(Fm.Server.Config.MoneyAccuracy, 10) || 2;
    var format = '0.';
    for (var i = 0; i < moneyAccuracy; i++) {
        format += '0';
    }
    return function (obj) {
        obj = obj * 100;
        return Ext.util.Format.number(obj, format) + "%";
    }

}

//枚举、列表 映射
FmUtil.prototype.dataTextRender = function (datas) {
    return function (v) {
        if (v !== undefined && v !== null && v !== "") {
            var _item = Ext.Array.findBy(datas, function (item, index) {
                return item.Value == v;
            });
            if (_item) {
                return _item.Text
            }
        }
        return '';
    }
}

FmUtil.prototype.columnPanelBuild = function (_items) {
    var obj = {
        xtype: 'container',
        layout: "column",
        defaults: {
            xtype: "textfield",
            margin: "5 0 0 0",
            labelAlign: "right",
            labelWidth: 80,
            columnWidth: 0.5
        },
        items: _items
    }
    return obj;
}

//对比计算
FmUtil.prototype.comp = function (op, a, b) {
    switch (op) {
        case ">":
            return a > b;
            break;
        case ">=":
            return a >= b;
            break;
        case "<":
            return a < b;
            break;
        case "=":
        case "===":
            return a === b;
            break;
        case "==":
            return a == b;
            break;
        case "<=":
            return a <= b;
            break;
        case "like":
            return a && a.toLowerCase().indexOf(b.toLowerCase()) > -1;
            break;
        case "ClikeL":
            return b && b.toLowerCase().indexOf(a.toLowerCase()) > -1;
            break;
            //当指定字段值非空时通过验证
        case "!empty":
            return !!(a && a.toLowerCase());
            break;
        default:
            return true;
            break;
    }
}

//是否包含子字符串
FmUtil.prototype.containString = function (source, part) {
    for (var i = 0, j = 0; i < source.length; i++) {
        if (source[i] === part[j]) {
            j++;
            if (j === part.length) {
                return true;
            }
        } else {
            j = 0;
        }
    }
    return false;
}

//获取form的验证错误消息
FmUtil.prototype.getFormErrorMsg = function (form) {
    errors = Ext.Array.findBy(form.getForm().monitor.items.items, function (element, index, array) {
        return element.wasValid === false;
    });
    if (errors) {
        return (errors.errorfieldLabel || errors.fieldLabel || '输入错误') + ":" + errors.activeErrors.join(',');
    }
    return null;
}

FmUtil.prototype.Guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxx xxxxxx'.replace(/[xy]/g,
        function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

//模拟post下载文件
FmUtil.prototype.downLoadFile = function (options) {
    var config = Ext.apply({ method: 'post' }, options),
        formId = 'down-file-form-kdkjgjkdagjfkdgh',
        form = Ext.fly(formId);

    if (!form) {
        form = Ext.getBody().createChild({
            tag: 'form',
            id: formId,
            name: formId,
            method: 'POST',
            style: 'display:none'
        });
    }
    Ext.Ajax.request({
        url: config.url,
        form: form,
        isUpload: true,
        params: config.data
    });
}

//获取当前时间
FmUtil.prototype.getNowDate = function () {
    var loadServerDate = Date.parse(Fm.Server.Config.NowDate.replace(/-/g, "/")),
        loadClientDate = Fm.Config.clientDate.getTime(),
        nowClientDate = new Date().getTime();

    return new Date(nowClientDate + (loadServerDate - loadClientDate));
}

//获取当前时间字符串
FmUtil.prototype.getNowDateStr = function (format) {
    var format = format || 'Y-m-d H:i:s';
    return this.dateRender(format)(this.getNowDate());
}

//数量小数点保留
FmUtil.prototype.numberRender = function (color) {
    var numberAccuracy = parseInt(Fm.Server.Config.NumberAccuracy, 10) || 0;
    var format = '0.';
    for (var i = 0; i < numberAccuracy; i++) {
        format += '0';
    }
    //color = color || 'ff0000';
    if (color) {
        return function (obj) {
            return "<span style='color:#" + color + "'>" + Ext.util.Format.number(obj, format) + "</span>";
        }
    } else {
        return function (obj) {
            return Ext.util.Format.number(obj, format);
        }
    }
}

//需要tips
FmUtil.prototype.getTips = function () {
    Fm.log.warn('Util.getTips过期，替代：列属性配置：showTip:true');
    return function (data, metadata, record) {
        if (metadata !== null) {
            metadata.tdAttr = 'data-qtip="' + data + '"';
        }
        return data;
    }
}

//压缩字符串 zip
FmUtil.prototype.stringToZipAsync = function (str) {
    var zip = new JSZip();
    zip.file("param.txt", str);

   return zip.generateAsync({ type: "base64", compression: 'DEFLATE', compressionOptions: { level: 9 } });
}

var fmUtil = Ext.ns('Fm.Common').Util = new FmUtil();
/* ***********************************************
 * author :  
 * function: 
 * history:  created by   
 * ***********************************************/
Ext.ns('FmApp.Common').Core = {
    Shared: {
        getMenuData: function () {
            var _data = Fm.Server.Menus;

            var getSub = function (_pid, noIcon) {
                var _temp = Ext.Array.filter(_data, function (item, index) {
                    return item.ParentId === _pid && item.Name !== '_';
                });

                for (var i = 0; i < _temp.length; i++) {
                    var item = _temp[i];
                    if (!noIcon) {
                        if (item.Icon && Ext.String.trim(item.Icon) != '') {
                            item.iconCls = item.Icon;
                        } else {
                            item.iconCls = 'fa fa-chevron-right';
                        }
                    }
                    //item.Icon = undefined;
                    if (item.ViewParams && typeof item.ViewParams === 'string') {
                        item.ViewParams = Ext.JSON.decode(item.ViewParams);
                    }
                    item.text = item.Name;

                    var _sub = getSub(item.Id, true);
                    if (_sub.length > 0) {
                        item.children = _sub
                    } else {
                        item.leaf = true;
                    }
                }
                return _temp;
            }

            return getSub(0);
        },
        getForData: function (data) {
            var getarray = function (data, _text) {
                if (!data) {
                    return;
                }
                var cg = [];
                for (var i = 0; i < data.length; i++) {
                    if (Ext.isArray(data[i].Value)) {
                        cg[i] = {
                            text: data[i].Text,
                            leaf: false,
                            checked: false,
                            children: getarray(data[i].Value, data[i].Text)
                        };
                    } else {
                        var childen = [];
                        for (var j = 0; j < data.length; j++) {
                            childen[j] = {
                                GroupRuleBit: _text + '|' + data[j].RuleBit,
                                RuleBit: data[j].RuleBit,
                                value: data[j].RuleBit,
                                text: data[j].Name,
                                Id: data[j].Id,
                                leaf: true,
                                checked: false
                            };
                        }
                        return childen;
                    }
                }
                return cg;
            };
            return getarray(data);

        }
    }
}
///* ***********************************************
// * author :  苗建龙
// * function: 
// * history:  created by FeiLong 2015/5/11 16:21:57 

//调用示例  var data = fmAppFactory.Data.getDataStore('key');
var fmAppFactory = fmCommonFactory({ appName: 'FmApp' });
/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/12/9 17:08:39 
 * ***********************************************/
Ext.ns('FmApp.Common').Service = {
    Sys: {
        isPermission: function (key) {
            return Ext.Array.findBy(fmAppFactory.Data.getDatas("Privileges"), function (item) {
                return item.Value === key && item.IsAlloted;
            }) != null;
        }
    }
}

var fmService = Ext.ns('FmApp.Common').Service;