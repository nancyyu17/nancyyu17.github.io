var num = 1 //keep track of the number of containers

// check off specific Todos by Clicking
$(document).on("click", " ul li", function(){
	$(this).toggleClass("completed");
});

//click on trash can icon to delete todo
$(document).on("click", "ul span", function(event){
	var trashID = $(this).attr('id');
	// console.log(trashID);
	$("#" + trashID).parent().fadeOut(300, function(){
		$("#" + trashID).parent().remove();
	});
	// event.stopPropagation(); //stop the span click from bubbling up to other elements	
})


$(document).on("keypress", "input[type = 'text']", function(event){
	if(event.which === 13){
		var inputID = $(this).attr("id")
		var newToDo = $("input[type = 'text']" + '#' + inputID).val();
		$("input[type = 'text']" + '#' + inputID).val("");//clear the input once we hit enter
		
		//create a new li adn add to ul
		var ID = $("input[type = 'text']" + '#' + inputID).parent().attr("id");
		var TrashID = $("#" + ID + " ul li").length + 1
		$("#" + ID + " ul").append("<li><span id = trash" + inputID[0] + "_"+ TrashID + "><i class ='far fa-trash-alt'></i></span>" + newToDo + "</li>");
	}
});



$(document).on("click", ".minusPlus", function(){
	var minusPlusID = $(this).attr("id");
	var parentID = minusPlusID[minusPlusID.length - 1];
	// console.log(minusPlusID);
	// console.log(parentID);
	$("#" + minusPlusID).toggleClass('rotation');
	$("#" + minusPlusID).toggleClass('fas fa-minus-circle fas fa-plus-circle');
	$('#' + parentID + 'Input').slideToggle(250);
	$('#' + parentID + 'ul').slideToggle(250);	
});



//add new TODO list
$(document).on("click", "#newList", function(){
	num = num + 1
	$('<div class = container' +' id ='+ num + '>'+'<h1><span class ="delList" = id = "delList'+ num +'"><i class="fas fa-times-circle"></i></span> TO-DO LIST<span><i id = "minusPlus'+ num +'"'+ ' class="minusPlus fas fa-minus-circle"></i></span> </h1><input  id ='+ num + 'Input ' + 'type="text" placeholder="ADD MORE FUN TO-DOs HERE:D"><ul id = "' + num + 'ul"><li><span id = "trash'+ num + '_1"><i class="far fa-trash-alt"></i></span>To-do 1</li><li><span id = "trash'+ num+ '_2"><i class="far fa-trash-alt"></i></span>To-do 2</li><li><span id = "trash'+ num+ '_3"><i class="far fa-trash-alt"></i></span>To-do 3</li></ul></div>').insertAfter("div:last")

});

//delete Button animation
$(document).on("click", "#delButton", function(){
	var delButtonDisplay = document.querySelector("#delButton");
	if (delButtonDisplay.textContent === "Delete Mode ON") {
		delButtonDisplay.textContent = "Delete Mode OFF"
	}else{
		delButtonDisplay.textContent = "Delete Mode ON"
	}

	//disable addNew button while the delete mode is on
	if (delButtonDisplay.textContent === "Delete Mode OFF") {
		document.getElementById("newList").disabled = true;
		document.getElementById("newList").style.opacity = 0.5;
	}else{;
		document.getElementById("newList").disabled = false;
		document.getElementById("newList").style.opacity = 1;	
	}

	$(".container").toggleClass("animated");
	$(".delList").toggleClass("delShowup");
});

//delete sepecific TODO list
$(document).on("click", ".delList", function(){
	var divID = $(this).parent().parent().attr('id');
	var numDiv = $("body").find('.container');

	if (numDiv.length === 1){
		alert("Need to have at least one To-do List on the page.")
	}else{
		$('#' + divID).fadeOut(300, function(){
		$('#' + divID).remove()
	})
	}

})

// make our todo list draggable
$(document).on("mousedown", ".container", function(){
	$(this).draggable()
})


