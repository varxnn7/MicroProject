// JPDB Connection Configuration
var connToken = "90933498|-31949244602169023|90903854";
var dbName = "SCHOOL-DB";
var relName = "STUDENT-TABLE";
var baseUrl = "http://api.login2explore.com:5577";

// Execute Command Helper to handle synchronous AJAX calls reliably
function executeCommand(reqString, apiEndPointUrl)
{
    var url = baseUrl + apiEndPointUrl;
    var jsonObj = null;

    $.ajax({
        url: url,
        type: "POST",
        data: reqString,
        async: false,

        success: function (result)
        {
            jsonObj = typeof result === "string" ? JSON.parse(result) : result;
        },

        error: function (result)
        {
            var dataJsonObj = result.responseText || result;

            if (typeof dataJsonObj === "string")
            {
                try
                {
                    jsonObj = JSON.parse(dataJsonObj);
                }
                catch (e)
                {
                    jsonObj = {
                        status: result.status,
                        message: dataJsonObj
                    };
                }
            }
            else
            {
                jsonObj = dataJsonObj;
            }
        }
    });

    return jsonObj;
}

// Display Alert / Toast Notification
function showNotification(msg, isSuccess)
{
    var $toast = $("#toast");

    $toast.css("background-color", isSuccess ? "#059669" : "#dc2626");
    $toast.text(msg).fadeIn(300).delay(3000).fadeOut(400);

    alert(msg);
}

// On document ready, reset form state
$(document).ready(function ()
{
    resetForm();
});

// Save Record Number to Local Storage
function saveRecNo2LS(jsonObj)
{
    var lvData = typeof jsonObj.data === "string"
        ? JSON.parse(jsonObj.data)
        : jsonObj.data;

    if (lvData && lvData.rec_no !== undefined)
    {
        localStorage.setItem("rec_no", lvData.rec_no);
    }
}

// Reset Form to initial state
function resetForm()
{
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#stuClass").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");

    $("#rollNoMsg").html("");

    $("#rollNo").prop("disabled", false);
    $("#fullName").prop("disabled", true);
    $("#stuClass").prop("disabled", true);
    $("#birthDate").prop("disabled", true);
    $("#address").prop("disabled", true);
    $("#enrollmentDate").prop("disabled", true);

    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);

    localStorage.removeItem("rec_no");

    setTimeout(function ()
    {
        $("#rollNo").focus();
    }, 0);
}

// Check DB when user leaves Roll No. field (on blur)
$("#rollNo").on("blur", function ()
{
    var rollNoVal = $("#rollNo").val().trim();

    if (rollNoVal === "")
    {
        return;
    }

    var getReqObj = {
        rollNo: rollNoVal
    };

    var getReqStr = createGET_BY_KEYRequest(
        connToken,
        dbName,
        relName,
        JSON.stringify(getReqObj)
    );

    var resultObj = executeCommand(getReqStr, "/api/irl");

    if (!resultObj)
    {
        showNotification("Error connecting to JsonPowerDB server.", false);
        return;
    }

    if (resultObj.status === 400)
    {
        // New Record flow
        $("#rollNoMsg").html(
            '<span class="status-badge badge-new">New Student</span>'
        );

        $("#fullName").prop("disabled", false).val("");
        $("#stuClass").prop("disabled", false).val("");
        $("#birthDate").prop("disabled", false).val("");
        $("#address").prop("disabled", false).val("");
        $("#enrollmentDate").prop("disabled", false).val("");

        $("#save").prop("disabled", false);
        $("#update").prop("disabled", true);
        $("#reset").prop("disabled", false);

        setTimeout(function ()
        {
            $("#fullName").focus();
        }, 0);
    }
    else if (resultObj.status === 200)
    {
        // Existing Record flow
        $("#rollNoMsg").html(
            '<span class="status-badge badge-existing">Existing Student</span>'
        );

        saveRecNo2LS(resultObj);

        var dataObj = typeof resultObj.data === "string"
            ? JSON.parse(resultObj.data)
            : resultObj.data;

        var stuData = dataObj.record;

        $("#fullName").val(stuData.fullName || "").prop("disabled", false);
        $("#stuClass").val(stuData.stuClass || "").prop("disabled", false);
        $("#birthDate").val(stuData.birthDate || "").prop("disabled", false);
        $("#address").val(stuData.address || "").prop("disabled", false);
        $("#enrollmentDate").val(stuData.enrollmentDate || "").prop("disabled", false);

        // Lock Primary Key field
        $("#rollNo").prop("disabled", true);

        $("#save").prop("disabled", true);
        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);

        setTimeout(function ()
        {
            $("#fullName").focus();
        }, 0);
    }
});

// Validate Form Inputs & return JSON string
function validateAndGetFormData()
{
    var rollNoVar = $("#rollNo").val().trim();

    if (rollNoVar === "")
    {
        alert("Roll No. Required");
        $("#rollNo").focus();
        return "";
    }

    var fullNameVar = $("#fullName").val().trim();

    if (fullNameVar === "")
    {
        alert("Full Name Required");
        $("#fullName").focus();
        return "";
    }

    var stuClassVar = $("#stuClass").val().trim();

    if (stuClassVar === "")
    {
        alert("Class Required");
        $("#stuClass").focus();
        return "";
    }

    var birthDateVar = $("#birthDate").val().trim();

    if (birthDateVar === "")
    {
        alert("Birth Date Required");
        $("#birthDate").focus();
        return "";
    }

    var addressVar = $("#address").val().trim();

    if (addressVar === "")
    {
        alert("Address Required");
        $("#address").focus();
        return "";
    }

    var enrollmentDateVar = $("#enrollmentDate").val().trim();

    if (enrollmentDateVar === "")
    {
        alert("Enrollment Date Required");
        $("#enrollmentDate").focus();
        return "";
    }

    var jsonStrObj = {
        rollNo: rollNoVar,
        fullName: fullNameVar,
        stuClass: stuClassVar,
        birthDate: birthDateVar,
        address: addressVar,
        enrollmentDate: enrollmentDateVar
    };

    return JSON.stringify(jsonStrObj);
}

// Save Student (Insert - PUT)
function saveStudent()
{
    var jsonStr = validateAndGetFormData();

    if (jsonStr === "")
    {
        return;
    }

    var putReqStr = createPUTRequest(
        connToken,
        jsonStr,
        dbName,
        relName
    );

    var resultObj = executeCommand(putReqStr, "/api/iml");

    if (resultObj && resultObj.status === 200)
    {
        showNotification("Student record saved successfully!", true);
    }
    else
    {
        showNotification(
            "Error saving student record: " +
            (resultObj ? resultObj.message : "Network error"),
            false
        );
    }

    resetForm();
}

// Update Student (Update - UPDATE)
function updateStudent()
{
    var jsonStr = validateAndGetFormData();

    if (jsonStr === "")
    {
        return;
    }

    var recNo = localStorage.getItem("rec_no");

    if (!recNo)
    {
        alert("Record number missing for update!");
        return;
    }

    var updateReqStr = createUPDATERecordRequest(
        connToken,
        jsonStr,
        dbName,
        relName,
        recNo
    );

    var resultObj = executeCommand(updateReqStr, "/api/iml");

    if (resultObj && resultObj.status === 200)
    {
        showNotification("Student record updated successfully!", true);
    }
    else
    {
        showNotification(
            "Error updating student record: " +
            (resultObj ? resultObj.message : "Network error"),
            false
        );
    }

    resetForm();
}