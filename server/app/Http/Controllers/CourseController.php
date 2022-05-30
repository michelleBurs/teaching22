<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    // get all courses
    public function index()
    {
        $courses = Course::with([])->get();
        return $courses;
    }

    // create new course
    public function save(Request $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            $course = Course::firstOrCreate($request->all());
            DB::commit();
            return response()->json($course, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving courses failed: " . $e->getMessage(), 420);
        }
    }

    // update course
    public function update(Request $request, int $id): JsonResponse
    {
        DB::beginTransaction();
        try {
            $course = Course::with([])->where('id', $id)->first();
            if ($course != null) {
                $course->update($request->all());
            }
            DB::commit();
            return response()->json($course, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("updating course failed: " . $e->getMessage(), 420);
        }
    }

    // delete course
    public function delete(int $id): JsonResponse
    {
        $course = Course::where('id', $id)->first();
        if ($course != null) {
            $course->delete();
        } else {
            throw new \Exception("course could not be deleted - it does not exist");
        }
        return response()->json('course(' . $id . ') successfully deleted', 200);
    }
}
