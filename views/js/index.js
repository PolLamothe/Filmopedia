window.addEventListener('load', (event) =>{
    document.getElementById('content').style.display = 'inline'
    document.getElementById('loading').style.display = 'none'
})
function searchAreaChanging(){
    if($('#searchArea').val() != ''){
        var text = $('#searchArea').val()
        $.ajax({
            type:'POST',
            url:'/searchBarChange',
            data:{keyword : text},
            success: function(output){
                var subject = document.getElementById('recommandation')
                subject.innerHTML = ''
                var content = ''
                for(var i = 0; i <output.length;i++){
                    content += output[i]
                }
                subject.innerHTML = content
            }
        })
    }else{
        var subject = document.getElementById('recommandation')
        subject.innerHTML = ''
    }
}