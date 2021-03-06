/**
 * 用户管理
 */
var pageCurr;
var form;
$(function() {
    layui.use('table', function(){
        var table = layui.table;
        form = layui.form;

        tableIns=table.render({
            elem: '#eodModuleList',
            url:'/eodModule/getEodModuleList',
            method: 'post', //默认：get请求
            cellMinWidth: 80,
            page: true,
            request: {
                pageName: 'pageNum', //页码的参数名称，默认：pageNum
                limitName: 'pageSize' //每页数据量的参数名，默认：pageSize
            },
            response:{
                statusName: 'code', //数据状态的字段名称，默认：code
                statusCode: 200, //成功的状态码，默认：0
                countName: 'totals', //数据总数的字段名称，默认：count
                dataName: 'list' //数据列表的字段名称，默认：data
            },
            cols: [[
                {type:'numbers'}
                ,{field:'eodModuleId', title:'组件id',align:'center'}
                ,{field:'enStructure', title:'结构英文名',align:'center'}
                ,{field:'cnStructure', title:'结构中文名',align:'center'}
                ,{field:'enCirculatory', title:'循环体英文名',align:'center'}
                ,{field:'cnCirculatory', title:'循环体中文名',align:'center'}
                ,{field:'enField', title:'字段名称英文',align:'center'}
                ,{field:'cnField', title:'字段名称中文',align:'center'}
                ,{field:'remark', title:'备注',align:'center'}
                ,{title:'操作',align:'center', toolbar:'#optBar'}
            ]],
            done: function(res, curr, count){
                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                //console.log(res);
                //得到当前页码
                console.log(curr);
                //得到数据总量
                //console.log(count);
                pageCurr=curr;
            }
        });
        //监听工具条
        table.on('tool(eodModuleTable)', function(obj){
            var data = obj.data;
            if(obj.event === 'del'){
                //删除
                delEodModule(data,data.id,data.sysEodModuleName);
            } else if(obj.event === 'edit'){
                //编辑
                edit(data,"编辑");
            }
        });

        //监听提交
        form.on('submit(eodModuleSubmit)', function(data){
            // TODO 校验
            formSubmit(data);
            return false;
        });

    });
});

//提交表单
function formSubmit(obj){
    $.ajax({
        type: "POST",
        data: $("#eodModuleForm").serialize(),
        url: "/eodModule/setEodModule",
        success: function (data) {
            if (data.code == 1) {
                layer.alert(data.msg,function(){
                    layer.closeAll();
                    load(obj);
                });
            } else {
                layer.alert(data.msg);
            }
        },
        error: function () {
            layer.alert("操作请求错误，请您稍后再试",function(){
                layer.closeAll();
                //加载load方法
                load(obj);//自定义
            });
        }
    });
}

//新增
function add() {
    edit(null,"新增");
}

//打开编辑框
function edit(data,title){
    var parentId = null;
    if(data == null){
        $("#id").val("");
    }else{
        //回显数据
        $("#id").val(data.id);
        $("#eodModuleId").val(data.eodModuleId);
        $("#enStructure").val(data.enStructure);
        $("#cnStructure").val(data.cnStructure);
        $("#enCirculatory").val(data.enCirculatory);
        $("#cnCirculatory").val(data.cnCirculatory);
        $("#enField").val(data.enField);
        $("#cnField").val(data.cnField);
        $("#remark").val(data.remark);
        $("#logicDelete").val(data.logicDelete);
        $("#createTime").val(data.createTime);
    }

    //拉取最新的表格数据
    formSelects.data('eodModule', 'server', {
        url: '/eodModule/eodModuleList',
        keyName: 'name',
        keyVal: 'id',
        success: function(id, url, searchVal, result){      //使用远程方式的success回调
            console.log(pid)
            if(pid != null){
                var assistAuditArry =pid.split(",");
                formSelects.value('eodModule', assistAuditArry);
            }
            console.log(result);    //返回的结果
        },
        error: function(id, url, searchVal, err){           //使用远程方式的error回调
            //同上
            console.log(err);   //err对象
        },
    });


    var pageNum = $(".layui-laypage-skip").find("input").val();
    $("#pageNum").val(pageNum);

    layer.open({
        type:1,
        title: title,
        fixed:false,
        resize :false,
        shadeClose: true,
        area: ['550px','550px'],
        content:$('#setEodModule'),
        end:function(){
            cleanEodModule();
        }
    });
}

//删除
function delEodModule(obj,id,name) {
    if(null!=id){
        layer.confirm('您确定要删除吗？', {
            btn: ['确认','返回'] //按钮
        }, function(){
            $.post("/eodModule/del",{"id":id},function(data){
                if (data.code == 1) {
                    layer.alert(data.msg,function(){
                        layer.closeAll();
                        load(obj);
                    });
                } else {
                    layer.alert(data.msg);
                }
            });}, function(){
            layer.closeAll();
        });
    }
}

function load(obj){
    //重新加载table
    tableIns.reload({
        where: obj.field
        , page: {
            curr: pageCurr //从当前页码开始
        }
    });
}

function cleanEodModule(){
    $("#id").val("");
    $("#eodModuleId").val("");
    $("#enStructure").val("");
    $("#cnStructure").val("");
    $("#enCirculatory").val("");
    $("#cnCirculatory").val("");
    $("#enField").val("");
    $("#remark").val("");
    $("#logicDelete").val("");
}