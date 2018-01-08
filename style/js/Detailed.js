$(function () {
    detail.init();//初始化
});


var detail = {
    //初始化
    init: function () {
        //减
        $(".divMinus").bind("click", function () {
            detail.PlusMinusNum(this);
        });

        //加
        $(".divPlus").bind("click", function () {
            detail.PlusMinusNum(this);
        });

        //立即购买
        $("#spBuyNow").bind("click", function () {
            detail.SubmitFun("A");//提交请求
        });

        //加入购物车
        $("#spAddJhds").bind("click", function () {
            detail.SubmitFun("B");//提交请求
        });
    },
    //加、减数量
    PlusMinusNum: function (obj) {
        var iptNum = $(obj).parent().parent().find(".iptNum");
        var num = parseInt(iptNum.val());

        if ($(obj).attr("class") == "divMinus") {
            if (num > 1) {
                iptNum.val(--num);
            }
            else {
                detail.ShowTip("数量最小为1！");
            }
        }
        else {
            if (num < 99) {
                iptNum.val(++num);
            }
            else {
                detail.ShowTip("数量最大为99！");
            }
        }

        return false;
    },
    /*提交请求
     *type：请求类型(A：立即购买;B：加入购物车)
     */
    SubmitFun: function (type) {
        var IsLogin = lxd.IsLogin();
        var ReqUrl = lxd.GetHref();                                     //发起请求地址
        var SerialNum = $("#hdfYuanSerialNum").val();                   //序列号（所属机构）
        var MemberID = $("#hdfMemberID").val();                         //会员ID
        var ProId = $.trim($("#hdfProId").val());                       //产品ID
        var OrderNames = $.trim($("#hdfProName").val());                //产品名称
        var Price = $.trim($("#hdfPrice").val());                       //产品价格
        var ImgSrc = $.trim($("#hdfProImg").val());                     //产品图片地址
        var ProNum = $(".iptNum").val();                                //产品数量
        var AllTotal = 0;                                               //总金额

        if ($("#spTip").html() == null) {
            alert("提示标签不存在，请联系客服人员！");
            return;
        }

        if (IsLogin == null || IsLogin == "") {
            return detail.ShowTip("是否登录标志错误，请联系客服人员！");
        }
        if (ReqUrl == null || ReqUrl == "") {
            return detail.ShowTip("发起请求地址错误，请联系客服人员！");
        }
        if (SerialNum == null || SerialNum == "") {
            return detail.ShowTip("序列号错误，请联系客服人员！");
        }
        if (MemberID == null) {
            return detail.ShowTip("会员ID标签不存在，请联系客服人员！");
        }
        if (ProId == null || ProId == "") {
            return detail.ShowTip("产品ID标签不存在，请联系客服人员！");
        }
        if (OrderNames == null || OrderNames == "") {
            return detail.ShowTip("产品名称标签不存在，请联系客服人员！");
        }
        //Price = "0.01";
        if (Price == null || Price == "") {
            return detail.ShowTip("产品价格标签不存在，或格式不正确，请联系客服人员！");
        }
        else {
            if (chkFormat(Price, 'money')) {
                return detail.ShowTip("产品价格格式不正确，请联系客服人员！");
            }
            else if (Price == 0) {
                return detail.ShowTip("产品价格格必须大于0，请联系客服人员！");
            }
        }
        if (ImgSrc == null || ImgSrc == "") {
            return detail.ShowTip("产品图片标签不存在，请联系客服人员！");
        }
        if (ProNum == null || ProNum == "") {
            return detail.ShowTip("产品数量标签不存在或格式错误，请联系客服人员！");
        }
        AllTotal = (parseInt(ProNum) * parseFloat(Price)).toFixed(2);

        //var json = {
        //    Type: "0", ReqUrl: "" + ReqUrl + "", IsLogin: "" + IsLogin + "", SerialNum: "" + SerialNum + "", MemberID: "" + MemberID + "", OrderNo: "", AllTotal: "" + AllTotal + "", OrderNames: "" + OrderNames + "",
        //    lProInfo: [{ ProId: "" + ProId + "", ProName: "" + OrderNames + "", Price: "" + Price + "", ImgSrc: "" + ImgSrc + "", ProNum: "" + ProNum + "", ProTotal: "" + AllTotal + "" }]
        //};


        //$("[name='strOrderInfo']").val(JSON.stringify(json));

        var jsonStr = '{"Type": "0", "ReqUrl": "' + ReqUrl + '", "IsLogin": "' + IsLogin + '", "SerialNum": "' +
            SerialNum + '", "MemberID": "' + MemberID + '", "OrderNo": "", "AllTotal": "' + AllTotal + '", "OrderNames": "' +
            OrderNames + '","lProInfo": [{ "ProId": "' + ProId + '", "ProName": "' + OrderNames + '", "Price": "' +
            Price + '", "ImgSrc": "' + ImgSrc + '", "ProNum": "' + ProNum + '", "ProTotal": "' + AllTotal + '" }]}';

        $("[name='strOrderInfo']").val(jsonStr);
        $("[name='OrgLogo']").val($("#hdfOrgLogo").val());

        if (type == "A")//向(服务器【立即购买】Url)提交请求
        {
            $("#formOrderInfo").attr("action", $("#hdfSubmitOrderUrl").val()).submit();
        }
        else if (type == "B")//向(服务器【加入购物车】Url)提交请求
        {
            $("#formOrderInfo").attr("action", $("#hdfProAddSuccessUrl").val()).submit();
        }
        else {
            alert("代码错误：请求类型错误！");
        }
    },
    //显示提示信息
    ShowTip: function (tip) {
        $("#spTip").text("").hide().text(tip).show(1000);
    }
}
