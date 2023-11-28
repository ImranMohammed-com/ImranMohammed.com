
function LoadPage(url){
    $.ajax({
        method:"get",
        url:url,
        success:(res)=>{
            $("#main1").html(res);
        }
    })
}
$(function(){
    $("#inpGroupPassword").hide();
    $("#SignIn").click(()=>{
        $("#inpGroup").hide();
        LoadPage("SignInForm.html");
        $("a").addClass("a");
        $("header").hide();
    })
    let email = "";
    $("#btnGetStarted").click(()=>{
          email = $("#inpEmail").val();
          $.ajax({
            method:"get",
            url:"http://127.0.0.1:6600/getusers",
            success:(response)=>{
             let user = response.find(item=>item.Email===email);
             if (user) {
                if (user.Email===email) {
                    $("#inpGroup").hide();
                    $("#inpGroupPassword").show();
                }
             } else{
                $("#EmailError").html(`User Not Found at all- <a style="text-decoration:underline;" class="text-primary" id="RegisterForm" href="#">Register</a>`)
             }
            }
          })
    })

    $("#btnGetSignIn").click(()=>{
        let password = $("#inpPassword").val();
        $.ajax({
            method:"get",
            url:"http://127.0.0.1:6600/getusers",
            success:(users)=>{
                let user = users.find(item=>item.Email === email);
                if (user) {
                    if (user.Password=== password) {
                        $("#inpGroupPassword").hide();
                        $("#SignIn").html(`${user.
                            UserName}- SignOut`)
                            alert("LogIn Successfully");
                    } else{
                        alert("Incorrect Password")
                    }
                } else {
                    alert("user not found");
                }
            }
        })
    })
   
   $(document).on("click","#RegisterForm",()=>{
    LoadPage("RegisterForm.html");
    $("#inpGroup").hide();
   
    $("a").addClass("a");
    $("#EmailError").hide();
   })
   $(document).on("click", "#btnRegister", ()=>{
    let user = {
        UserId:$("#inpUserId").val(),
        UserName:$("#inpUserName").val(),
        Password:$("#inpRePassword").val(),
        Email:$("#inpReEmail").val(),
        Mobile:$("#inpMobile").val()
    }
    $.ajax({
        method:"post",
        url:"http://127.0.0.1:6600/adduser",
        data:user
       })

       alert("User added successfully");
       LoadPage("SignInForm.html");
   })
     function LoadVideo() {
        
       let Container =$("#main1");
       Container.html("");
      
      
        $.ajax({
            method:"get",
            url:"http://127.0.0.1:6600/getvideos",
            success:(videos)=>{
                videos.map(video=>{
                    $(`
                    
                    <div style="width:300px; height:400px;" class="card m-3" width="300">
                    <iframe height="250" width="300" class"card-img-top" src=${video.Url}></iframe>
                    <div class="card-body">
                    <h5 class="card-title">${video.Title}</h5>
                    </div>
                    <div class="card-footer"><a href="#" class="btn btn-primary">Go somewhere</a></div>
                    </div>
                    
                    `).appendTo(Container);
                })
            }
        })
     }
     
   $(document).on("click", "#btnReSignIn", ()=>{
    let userId="";
     let userPassword;
      userId=$("#inpSignInUserID").val();
      userPassword=$("#inpSignInPassword").val();
      $.ajax({
        method:"get",
        url:"http://127.0.0.1:6600/getusers",
        success:(users)=>{
            let user=users.find(item=>item.UserId===userId)
            
            if (user) {
                if (user.UserId===userId && user.Password === userPassword) {
                    LoadVideo();
                    $("#SignIn").html(`${user.
                        UserName}- <a href="#" id="SignOut">SignOut</a>`)
                } else{
                    alert("incorrect UserId or Password");
                }
            } else {
                alert("user noy found");
            }
        }
      })
    
   })

   $(document).on("click", "#SignOut", ()=>{
    this.location.reload();
   })
   
})


