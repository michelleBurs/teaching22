<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Offer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OfferController extends Controller
{
    // get all offers
    public function index()
    {
        $offers = Offer::with(['course', 'image', 'user.image'])->get();
        return $offers;
    }

    //find offer by a given id
    public function findById(int $id)
    {
        $offer = Offer::where('id', $id)->with(['course', 'image', 'user.image'])->first();
        return $offer != null ? response()->json($offer, 200) : response()->json(null, 200);
    }

    // create new offer
    public function save(Request $request): JsonResponse
    {
        $request = $this->parseRequest($request);

        DB::beginTransaction();
        try {
            $offer = new Offer();
            $offer->title = $request['title'];
            $offer->description = $request['description'];
            $offer->date = $request['date'];
            $offer->startTime = $request['startTime'];
            $offer->endTime = $request['endTime'];
            $offer->course_id = $request['course_id'];
            $offer->user_id = $request['user_id'];

            // save image
            if (isset($request['image']) && $request['image']['url'] != '') {
                $image = Image::firstOrCreate(['url' => $request['image']['url']]);
                $offer->image()->associate($image['id']);
            } else {
                //placeholder
                $image = Image::all()->find(1);
                $offer->image()->associate($image);
            }
            $offer->save();
            DB::commit();
            return response()->json($offer, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving offer failed: " . $e->getMessage(), 420);
        }
    }


    // delete offer

    public function update(Request $request, int $id): JsonResponse
    {
        DB::beginTransaction();
        try {
            $offer = Offer::with(['course', 'image', 'user'])->where('id', $id)->first();

            if ($offer != null) {
                $request = $this->parseRequest($request);
                $offer->update($request->all());

                // save image
                if (isset($request['image']) && $request['image']['url'] != '') {
                    $image = Image::firstOrCreate(['url' => $request['image']['url']]);
                    $offer->image()->associate($image['id']);
                } else {
                    //placeholder
                    $image = Image::all()->find(1);
                    $offer->image()->associate($image);
                }
                $offer->save();
            }
            DB::commit();
            return response()->json($offer, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("updating offer failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(int $id): JsonResponse
    {
        $offer = Offer::where('id', $id)->first();
        if ($offer != null) {
            $offer->delete();
        } else {
            throw new \Exception("offer could not be deleted - it does not exist");
        }
        return response()->json('offer(' . $id . ') successfully deleted', 200);
    }


    private function parseRequest(Request $request): Request
    {
        $request['date'] = new \DateTime($request->date);
        $request['startTime'] = new \DateTime($request->startTime);
        $request['endTime'] = new \DateTime($request->endTime);
        return $request;
    }


}
