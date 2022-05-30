<?php

namespace App\Http\Controllers;

use App\Models\Inquirie;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InquiryController extends Controller
{
    // get all inquiries
    public function index()
    {
        $inquiries = Inquirie::with(['offer.course', 'user.image'])->get();
        return $inquiries;
    }

    // create new inquiry
    public function save(Request $request): JsonResponse
    {
        $request = $this->parseRequest($request);

        DB::beginTransaction();
        try {
            $inquiry = Inquirie::create($request->all());
            DB::commit();
            return response()->json($inquiry, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving inquiry failed: " . $e->getMessage(), 420);
        }
    }


    // update inquiry
    public function update(Request $request, int $id): JsonResponse
    {
        DB::beginTransaction();
        try {
            $inquiry = Inquirie::with(['offer', 'user'])->where('id', $id)->first();
            if ($inquiry != null) {
                $request = $this->parseRequest($request);

                $inquiry->update($request->all());
            }
            DB::commit();
            return response()->json($inquiry, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("updating inquiry failed: " . $e->getMessage(), 420);
        }
    }

    // delete inquiry
    public function delete(int $id): JsonResponse
    {
        $inquiry = Inquirie::where('id', $id)->first();
        if ($inquiry != null) {
            $inquiry->delete();
        } else {
            throw new \Exception("inquiry could not be deleted - it does not exist");
        }
        return response()->json('inquiry(' . $id . ') successfully deleted', 200);
    }


    private function parseRequest(Request $request): Request
    {
        $request['date'] = new \DateTime($request->date);
        $request['startTime'] = new \DateTime($request->startTime);
        $request['endTime'] = new \DateTime($request->endTime);
        return $request;
    }

}
