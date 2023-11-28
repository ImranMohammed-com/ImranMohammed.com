function LoadPage(url) {
    $.ajax({
        method:"get",
        url:url,
        success:(res)=>{
            $("#ChildMain").html(res);
        }
    })
    
}

$(function(){
    $("#lnkSignIn").click(()=>{
        LoadPage("SignInForm.html");
        $("header").hide()
        })
    function LoadVideos(){
        $("header").hide();
        $.ajax({
            method:"get",
            url:"http://127.0.0.1:6600/getvideos",
            success:(Videos)=>{
                  Videos.map(video=>{
                    $(`
                    
                     <tr>
                     <td>${video.Title}</td>
                     <td>
                     <iframe src=${video.Url} width="200" height="150"></iframe>
                     </td>
                     <td>
                     <button class="bi bi-pencil btn btn-warning" name=${video.VideoId} id="btnEdit"></button>
                     <button class="bi bi-trash btn btn-danger"  name=${video.VideoId}  id="btnDelete"></button>
                     </td>
                    </tr>
                    
                    
                    `).appendTo("tbody");
                  })
            }
        })
    }

    $(document).on("click", "#btnReSignIn", ()=>{
        let userId = $("#inpSignInUserID").val();
        let userPassword= $("#inpSignInPassword").val();
        $.ajax({
            method:"get",
            url:"http://127.0.0.1:6600/getadmin",
            success:(users)=>{
              let user = users.find(item => item.UserId===userId);

                if(user){
                    if (user.UserId == userId && user.Password == userPassword) {
                        LoadPage("adminDashbord.html");
                        LoadVideos()
                        $("#lnkSignIn").html(`
                        ${user.UserName}-SignOut
                        `)
                        $("header").show()

                    } else{
                        alert("AdminId or Password incorrect");
                    }
                } else{
                    alert("Admin Not Found");
                }
            }
        })
    })
   function LoadCategory(){
    $.ajax({
        method:"get",
        url:"http://127.0.0.1:6600/getcategories",
        success:(categories)=>{
            categories.map(category=>{
                $(`
                <option value=${category.CategoryId}>
               ${category.CategoryName}
                </option>
                `).appendTo("#SelectCategory")
            })
        }
    })
   }

    $(document).on("click", "#NewVideo",()=>{
        LoadPage("Add-New-Video.html");
        $("header").show();
        $.ajax({
            method:"get",
            url:"http://127.0.0.1:6600/getcategories",
            success:(categories)=>{
                categories.map(category=>{
                    $(`
                    <option value=${category.CategoryId}>
                   ${category.CategoryName}
                    </option>
                    `).appendTo("#SelectCategory")
                })
            }
        })
    })

    $(document).on("click", "#btnAddVideo", ()=>{

        let video={
            VideoId:parseInt($("#inpVideoId").val()),
            Title:$("#inpVideoTitle").val(),
            Url:$("#inpVideoUrl").val(),
            Likes:parseInt($("#inpVideoLike").val()),
            Views:parseInt($("#inpVideoView").val()),
            CategoryId:parseInt($("#SelectCategory").val())
        }
        $.ajax({
            method:"post",
            url:"http://127.0.0.1:6600/addvideo",
            data:video
        })
        alert("video Added Successfully");
        LoadVideos();
        LoadPage("adminDashbord.html");
       
    })
    let id;
    $(document).on("click", "#btnEdit", (e)=>{
       LoadPage("Admin-Edit-Video.html")
       LoadCategory();
       id = parseInt(e.target.name);
       $.ajax({
        method:"get",
        url:`http://127.0.0.1:6600/getvideo/${id}`,
        success:(video)=>{
            $("#inpVideoId").val(video[0].VideoId)
            $("#inpVideoTitle").val(video[0].Title)
            $("#inpVideoUrl").val(video[0].Url)
            $("#inpVideoLike").val(video[0].Likes)
            $("#inpVideoView").val(video[0].Views)
            $("#SelectCategory").val(video[0].CategoryId)
        }

       })

    })

    $(document).on("click", "#btnCancel", ()=>{
        LoadVideos();
        LoadPage("adminDashbord.html");
    })

    $(document).on("click", "#btnUpdateVideo", ()=>{
        let video={
            VideoId:parseInt($("#inpVideoId").val()),
            Title:$("#inpVideoTitle").val(),
            Url:$("#inpVideoUrl").val(),
            Likes:parseInt($("#inpVideoLike").val()),
            Views:parseInt($("#inpVideoView").val()),
            CategoryId:parseInt($("#SelectCategory").val())
        }
        $.ajax({
                 method:"put",
                 url:`http://127.0.0.1:6600/updatevideo/${id}`,
                 data:video
        })
        alert("Video Updated");
        LoadVideos();
        LoadPage("adminDashbord.html");
    })

    $(document).on("click", "#btnDelete", (e)=>{
        id = parseInt(e.target.name);
        let flag=confirm("Are you Sure You Want to Delete!!!");

        if (flag == true) {
            $.ajax({
                method:"delete",
                url:`http://127.0.0.1:6600/deletevideo/${id}`

            })
            alert("Video Delete Successfully");
            LoadVideos();
            LoadPage("adminDashbord.html");
        }

    })
})