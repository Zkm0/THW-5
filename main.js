$(document).on("pagecreate", "#dataentry", function() {
    $("#form").on("submit", function(e) {
      e.preventDefault();
      var title = $("#title").val();
      var description = $("#description").val();
      var progress = $("#progress").val();
      var item = {
        "title": title,
        "description": description,
        "progress": progress
      };
      var bucketlist = JSON.parse(localStorage.getItem("bucketlist")) || [];
      bucketlist.push(item);
      localStorage.setItem("bucketlist", JSON.stringify(bucketlist));
      alert("Item added to bucket list!");
      $(this)[0].reset();
    });
  });
  
  $(document).on("pageshow", "#display", function() {
    var bucketlist = JSON.parse(localStorage.getItem("bucketlist")) || [];
    $("#bucketlist").empty();
    $.each(bucketlist, function(i, item) {
      var li = $("<li>");
      li.append($("<h3>").text(item.title));
      li.append($("<p>").text(item.description));
      li.append($("<p>").text("Progress: " + item.progress + "%"));
      var deleteButton = $("<a>").text("Delete").attr("href", "#").addClass("delete ui-btn ui-btn-icon-right ui-icon-delete").data("id", i);
      li.append(deleteButton);
      $("#bucketlist").append(li);
    });
    $("#bucketlist").listview("refresh");
  });
  
  $(document).on("click", ".delete", function() {
    var id = $(this).data("id");
    var bucketlist = JSON.parse(localStorage.getItem("bucketlist")) || [];
    bucketlist.splice(id, 1);
    localStorage.setItem("bucketlist", JSON.stringify(bucketlist));
    $(this).closest("li").remove();
    $("#bucketlist").listview("refresh");
  });
  
  