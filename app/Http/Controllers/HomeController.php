<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use response;

use App\Models\Student;

class HomeController extends Controller
{

    public function index(Request $request)
    {
        $student = new Student;

        $student->title = $request->title;

        $student->description = $request->description;

        $student->save();

        return 'student created';
    }

    public function show()
    {
        $student = Student::all();

        return view("show", compact('student'));
    }

    public function upload(Request $request)
    {
        if ($request->hasFile('upload')) {
            $originName = $request->file('upload')->getClientOriginalName();
            $fileName = pathinfo($originName, PATHINFO_FILENAME);
            $extension = $request->file('upload')->getClientOriginalExtension();
            $fileName = $fileName . '_' . time() . '.' . $extension;

            $request->file('upload')->move(public_path('media'), $fileName);

            $url = asset('media/' . $fileName);
            return response()->json(['fileName' => $fileName, 'uploaded' => 1, 'url' => $url]);
        }
    }
}
