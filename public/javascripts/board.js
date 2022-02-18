function Insert(){
    var Title = document.getElementById("title").value;
    var Content = document.getElementById("content").value;
    var Writer = $("#writer").val();
    $.ajax({
        url:'/board/new',
        async:true,
        type:'POST',
        data:{
            title:Title,
            writer:Writer,
            content:Content
        },
        success:function(){
        },
        error(){

        }
    });
    location.href='/';
}

function Delete(boardNum){
    $.ajax({
        url:'/board/delete',
        async:true,
        type:'POST',
        data:{
            id:boardNum
        },
        success:function(){

        },
        error(){

        }
    });
    location.reload();
}

function Update(){
    var Title = document.getElementById("title").value;
    var Content = document.getElementById("content").value;
    var Writer = $("#writer").val();
    var boardNum = $("#boardNum").val();
    $.ajax({
        url:'/board/update',
        async:true,
        type:'POST',
        data:{
            boardNum:boardNum,
            title:Title,
            writer:Writer,
            content:Content
        },
        success:function(){
        },
        error(){

        }
    });
    location.href='/';
}