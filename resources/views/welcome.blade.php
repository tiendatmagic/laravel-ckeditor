<!DOCTYPE html>
<html>
    <head>
        <title>Laravel CkEditor5 Image Upload Web tech Knowledge</title>

        <style type="text/css">
            .ck-editor__editable_inline {
                height: 500px;
            }
        </style>
    </head>

    <body>
       <form action="{{url('create')}}" method="POST">

        @csrf
           <label>Title</label>
           <input type="text" name="title">

           <textarea id="editor" name="description"></textarea>


           <input type="submit">
       </form>
       <script src="https://cdn.ckeditor.com/ckeditor5/34.2.0/classic/ckeditor.js"></script>
        <script>
            ClassicEditor
                .create(document.querySelector('#editor'), {
                    ckfinder: {
                        uploadUrl: "{{ route('ckeditor.upload', ['_token' => csrf_token()]) }}",
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        </script>
    </body>
</html>