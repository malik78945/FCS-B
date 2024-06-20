const express = require("express"); //express package initiated
const app = express(); // express instance has been created and will be access by app variable
const cors = require("cors");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const connection = require("./config/db.js");

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));


// app.get("/", (req, res) => {
//   res.redirect("/testing/home.html");
// });
// app.get("/profile", (req, res) => {
//   res.redirect("/testing/profile.html");
// });
// app.get("/cards", (req, res) => {
//   res.redirect("/testing/cards.html");
// });





// app.get("/voulenteer/", (req, res) => {
//   res.redirect("/voulenteer/profile.html");
// });

app.get("/manager/create", (req, res) => {
  res.redirect("/manager/createEvent.html");
});
// app.get("/manager/", (req, res) => {
//   res.redirect("/manager/profile.html");
// });


app.get("/admin/create", (req, res) => {
  res.redirect("/admin/createEvent.html");
});
// app.get("/admin/", (req, res) => {
//   res.redirect("/admin/profile.html");
// });





app.get("/voulenteer/events", (req, res) => {
  const allData = "select * from regionalevents";
  connection.query(allData, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.render("voulenteer/allEvents.ejs", { rows });
    }
  });
});





app.get("/manager/events", (req, res) => {
    const allData = "select * from regionalevents";
    connection.query(allData, (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.render("manager/allEvents.ejs", { rows });
      }
    });
});
app.get("/manager/eventView", (req, res) => {
    const allData = "select * from volunteer where id = ?";
    connection.query(allData, [req.query.id], (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.render("manager/eventView.ejs", { rows });
      }
    });
});

app.get("/manager/delete-data", (req, res) => {
  const deleteData = "delete from regionalevents where id=?";
  connection.query(deleteData, [req.query.id], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/manager/events");
    }
  });
});

app.get("/manager/update-data", (req, res) => {
    const updateData = "select * from  regionalevents where id=?";
    connection.query(updateData, req.query.id, (err, eachRow) => {
      if (err) {
        res.send(err);
      } else {
        console.log(eachRow[0]);
        result = JSON.parse(JSON.stringify(eachRow[0]));
        res.render("manager/editEvent.ejs", { data: eachRow[0] });
      }
    });
});

app.post("/manager/update", (req, res) => {
  const id_data = req.body.hidden_id;
  const name_data = req.body.name;
  const desc_data = req.body.desc;
  const date_data = req.body.date;
  const location_data = req.body.location;
  const updateQuery = "update regionalevents set heading=?, description=?, registerBy=?, region=? where id=?";
  connection.query(
    updateQuery,
    [name_data, desc_data, date_data, location_data, id_data],
    (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/manager/events");
      }
    }
  );
});

























app.get("/manager/voulView", (req, res) => {
    const allData = "select * from volunteer where id = ?";
    connection.query(allData, [req.query.id], (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.render("manager/voulView.ejs", { rows });
      }
    });
});

app.get("/manager/voulenteers", (req, res) => {
  const allData = "select * from volunteer";
  connection.query(allData, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      // res.json({ rows });
      res.render("manager/allVoulenteers.ejs", { rows });
    }
  });
});

app.get("/manager/delete-voul", (req, res) => {
  const deleteData = "delete from volunteer where id=?";
  connection.query(deleteData, [req.query.id], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/manager/voulenteers");
    }
  });
});

app.get("/manager/voul-update", (req, res) => {
    const updateData = "select * from  volunteer where id=?";
    connection.query(updateData, req.query.id, (err, eachRow) => {
      if (err) {
        res.send(err);
      } else {
        console.log(eachRow[0]);
        result = JSON.parse(JSON.stringify(eachRow[0]));
        res.render("manager/voulEdit.ejs", { data: eachRow[0] });
      }
    });
});

app.post("/manager/updateVoul", (req, res) => {
    const id_data = req.body.hidden_id;
    const name_data = req.body.name;
    const email_data = req.body.email;
    const phone_data = req.body.phone;
    const branch_data = req.body.branch;
    const address_data = req.body.address;
    const updateQuery = "update volunteer set name=?, email=?, phone=?, branch=?, address=? where id=?";
    connection.query(
      updateQuery,
      [name_data, email_data, phone_data, branch_data, address_data, id_data],
      (err, rows) => {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/manager/voulenteers");
        }
      }
    );
});
app.post("/voulenteer/updateVoul", (req, res) => {
    const id_data = req.body.hidden_id;
    const name_data = req.body.name;
    const email_data = req.body.email;
    const phone_data = req.body.phone;
    const branch_data = req.body.branch;
    const address_data = req.body.address;
    const updateQuery = "update volunteer set name=?, email=?, phone=?, branch=?, address=? where id=5";
    connection.query(
      updateQuery,
      [name_data, email_data, phone_data, branch_data, address_data, id_data],
      (err, rows) => {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/voulenteer/");
        }
      }
    );
});



























app.post("/manager/create", (req, res) => {
  var name = req.body.name;
  var desc = req.body.desc;
  var location = req.body.location;
  var date = req.body.date;
  try {
    connection.query(
      "INSERT into regionalevents (heading, description, region, registerBy) values(?,?,?,?)", 
      [name, desc, location, date],
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          // res.json({ result });
          res.redirect("/manager/events");  
        }
      }
    );
  } catch (err) {
    res.send(err);
  }
});
app.post("/admin/create", (req, res) => {
  var name = req.body.name;
  var desc = req.body.desc;
  var location = req.body.location;
  var date = req.body.date;
  try {
    connection.query(
      "INSERT into regionalevents (heading, description, region, registerBy) values(?,?,?,?)", 
      [name, desc, location, date],
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          // res.json({ result });
          res.redirect("/admin/events");  
        }
      }
    );
  } catch (err) {
    res.send(err);
  }
});












app.get("/admin/voulenteers", (req, res) => {
  const allData = "select * from volunteer";
  connection.query(allData, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      // res.json({ rows });
      res.render("admin/allVoulenteers.ejs", { rows });
    }
  });
});

app.get("/admin/delete-data", (req, res) => {
  const deleteData = "delete from regionalevents where id=?";
  connection.query(deleteData, [req.query.id], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/admin/events");
    }
  });
});

app.get("/admin/delete-voul", (req, res) => {
  const deleteData = "delete from volunteer where id=?";
  connection.query(deleteData, [req.query.id], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/admin/voulenteers");
    }
  });
});

app.get("/admin/update-data", (req, res) => {
    const updateData = "select * from  regionalevents where id=?";
    connection.query(updateData, req.query.id, (err, eachRow) => {
      if (err) {
        res.send(err);
      } else {
        console.log(eachRow[0]);
        result = JSON.parse(JSON.stringify(eachRow[0]));
        res.render("admin/editEvent.ejs", { data: eachRow[0] });
      }
    });
});

app.get("/admin/voul-update", (req, res) => {
    const updateData = "select * from  volunteer where id=?";
    connection.query(updateData, req.query.id, (err, eachRow) => {
      if (err) {
        res.send(err);
      } else {
        console.log(eachRow[0]);
        result = JSON.parse(JSON.stringify(eachRow[0]));
        res.render("admin/voulEdit.ejs", { data: eachRow[0] });
      }
    });
});

app.post("/admin/update", (req, res) => {
    const id_data = req.body.hidden_id;
    const name_data = req.body.name;
    const desc_data = req.body.desc;
    const date_data = req.body.date;
    const location_data = req.body.location;
    const updateQuery = "update regionalevents set heading=?, description=?, registerBy=?, region=? where id=?";
    connection.query(
      updateQuery,
      [name_data, desc_data, date_data, location_data, id_data],
      (err, rows) => {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/admin/events");
        }
      }
    );
});

app.post("/admin/updateVoul", (req, res) => {
    const id_data = req.body.hidden_id;
    const name_data = req.body.name;
    const email_data = req.body.email;
    const phone_data = req.body.phone;
    const branch_data = req.body.branch;
    const address_data = req.body.address;
    const updateQuery = "update volunteer set name=?, email=?, phone=?, branch=?, address=? where id=?";
    connection.query(
      updateQuery,
      [name_data, email_data, phone_data, branch_data, address_data, id_data],
      (err, rows) => {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/admin/voulenteers");
        }
      }
    );
});




app.get("/admin/events", (req, res) => {
  const allData = "select * from regionalevents";
  connection.query(allData, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.render("admin/allEvents.ejs", { rows });
    }
  });
});
app.get("/admin/eventView", (req, res) => {
  const allData = "select * from volunteer where id = ?";
  connection.query(allData, [req.query.id], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.render("admin/eventView.ejs", { rows });
    }
  });
});
app.get("/admin/voulView", (req, res) => {
  const allData = "select * from volunteer where id = ?";
  connection.query(allData, [req.query.id], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.render("admin/voulView.ejs", { rows });
    }
  });
});







app.get("/voulenteer/", (req, res) => {
  const allData = "select * from volunteer where id = 5";
  connection.query(allData, [req.query.id], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.render("voulenteer/profile.ejs", { rows });
    }
  });
});

app.get("/voulenteer/voul-update", (req, res) => {
  const updateData = "select * from  volunteer where id=5";
  connection.query(updateData, req.query.id, (err, eachRow) => {
    if (err) {
      res.send(err);
    } else {
      console.log(eachRow[0]);
      result = JSON.parse(JSON.stringify(eachRow[0]));
      res.render("voulenteer/profileEdit.ejs", { data: eachRow[0] });
    }
  });
});
app.get("/manager/", (req, res) => {
  const allData = "select * from manager where id = 5";
  connection.query(allData, [req.query.id], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.render("manager/profile.ejs", { rows });
    }
  });
});

app.get("/manager/manager-update", (req, res) => {
  const updateData = "select * from  manager where id=5";
  connection.query(updateData, req.query.id, (err, eachRow) => {
    if (err) {
      res.send(err);
    } else {
      console.log(eachRow[0]);
      result = JSON.parse(JSON.stringify(eachRow[0]));
      res.render("manager/profileEdit.ejs", { data: eachRow[0] });
    }
  });
});
app.get("/admin/", (req, res) => {
  const allData = "select * from admin where id = 1";
  connection.query(allData, [req.query.id], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.render("admin/profile.ejs", { rows });
    }
  });
});

app.get("/admin/admin-update", (req, res) => {
  const updateData = "select * from  admin where id=1";
  connection.query(updateData, req.query.id, (err, eachRow) => {
    if (err) {
      res.send(err);
    } else {
      console.log(eachRow[0]);
      result = JSON.parse(JSON.stringify(eachRow[0]));
      res.render("admin/profileEdit.ejs", { data: eachRow[0] });
    }
  });
});



























































app.get("/admin/managerView", (req, res) => {
  const allData = "select * from manager where id = ?";
  connection.query(allData, [req.query.id], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.render("admin/managerView.ejs", { rows });
    }
  });
});

app.get("/admin/managers", (req, res) => {
const allData = "select * from manager";
connection.query(allData, (err, rows) => {
  if (err) {
    res.send(err);
  } else {
    // res.json({ rows });
    res.render("admin/allManagers.ejs", { rows });
  }
});
});

app.get("/admin/delete-manager", (req, res) => {
const deleteData = "delete from manager where id=?";
connection.query(deleteData, [req.query.id], (err, rows) => {
  if (err) {
    res.send(err);
  } else {
    res.redirect("/admin/managers");
  }
});
});

app.get("/admin/manager-update", (req, res) => {
  const updateData = "select * from  manager where id=?";
  connection.query(updateData, req.query.id, (err, eachRow) => {
    if (err) {
      res.send(err);
    } else {
      console.log(eachRow[0]);
      result = JSON.parse(JSON.stringify(eachRow[0]));
      res.render("admin/managerEdit.ejs", { data: eachRow[0] });
    }
  });
});

app.post("/admin/updateManager", (req, res) => {
  const id_data = req.body.hidden_id;
  const name_data = req.body.name;
  const email_data = req.body.email;
  const phone_data = req.body.phone;
  const branch_data = req.body.branch;
  const address_data = req.body.address;
  const updateQuery = "update manager set name=?, email=?, phone=?, branch=?, address=? where id=?";
  connection.query(
    updateQuery,
    [name_data, email_data, phone_data, branch_data, address_data, id_data],
    (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/admin/managers");
      }
    }
  );
});
app.post("/admin/updateAdmin", (req, res) => {
  const id_data = req.body.hidden_id;
  const name_data = req.body.name;
  const email_data = req.body.email;
  const phone_data = req.body.phone;
  const address_data = req.body.address;
  const updateQuery = "update admin set name=?, email=?, phone=?, address=? where id=1";
  connection.query(
    updateQuery,
    [name_data, email_data, phone_data, address_data, id_data],
    (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/admin/");
      }
    }
  );
});
app.post("/manager/updateManager", (req, res) => {
  const id_data = req.body.hidden_id;
  const name_data = req.body.name;
  const email_data = req.body.email;
  const phone_data = req.body.phone;
  const branch_data = req.body.branch;
  const address_data = req.body.address;
  const updateQuery = "update manager set name=?, email=?, phone=?, branch=?, address=? where id=?";
  connection.query(
    updateQuery,
    [name_data, email_data, phone_data, branch_data, address_data, id_data],
    (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/manager/");
      }
    }
  );
});




app.listen(process.env.PORT || 3000, function (err) {
  if (err) console.log(err);
  console.log(`Running ${process.env.PORT}`);
});