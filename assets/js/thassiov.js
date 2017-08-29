window.onload = function() {
    $('#name').hover(function() {
        $('#thassiov').removeClass('hidden');
    }, function() {
        $('#thassiov').addClass('hidden');
    });

    let globalTimout;
    function writeLetterByLetter(target, message, index) {
        if (index < message.length) {
            $(target).append(message[index++]);
            globalTimout = setTimeout(function () {
                writeLetterByLetter(target, message, index, 20);
            }, 20);
        }
    }

    function clearText(target) {
        $(target).empty();
    }

    function setJsonResponseHeader() {
        console.log('response header');
        writeLetterByLetter('#response-header', 'RESPONSE: HTTP/1.1 OK', 0);
    }

    function clearJson() {
        clearText('#response-header');
        clearText('#response-key');
        clearText('#response-value');
    }

    $('#getbio').on('click', function() {
        clearJson();
        setJsonResponseHeader();
        writeLetterByLetter('#response-key', '\"bio\":', 0);
        writeLetterByLetter('#response-value', '\"I work on backend systems using Node.js and write about it from time to time. I mostly work on RESTful APIs and CLI apps.\"', 0);
    });

    $('#getskills').on('click', function() {
        clearJson();
        setJsonResponseHeader();
        writeLetterByLetter('#response-key', '\"skills\":', 0);
        writeLetterByLetter('#response-value', '\"[git, javascript, node.js, mongodb, restful api, scrum, linux, vim, docker, python]\"', 0);
    });

    $('#getcontact').on('click', function() {
        clearJson();
        setJsonResponseHeader();
        writeLetterByLetter('#response-key', '\"contact\":', 0);
        writeLetterByLetter('#response-value', '\"tvmcarvalho@gmail.com\"', 0);
    });

    $('#clear').on('click', function() {
        window.clearTimeout(globalTimout);
        clearJson();
    });
}

