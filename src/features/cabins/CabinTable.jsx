import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";

function CabinTable() {
  const { isLoading, cabins } = useCabins();



  const [searchParams] = useSearchParams();


  if (isLoading) return <Spinner />;


  // filter cabins by discount
  const filterValue = searchParams.get("discount") || "all";

  let filterdCabins;

  filterValue === "with-discount"
    ? (filterdCabins = cabins.filter((cabin) => cabin.discount > 0))
    : filterValue === "no-discount"
    ? (filterdCabins = cabins.filter((cabin) => cabin.discount === 0))
    : filterValue === "all"
    ? (filterdCabins = cabins)
    : (filterdCabins = []);

  
  
  
  //sort cabins

  const sortValue = searchParams.get("sort") || "startDate-asc";

  const [field, order] = sortValue.split("-");

  const modifier = order === "asc" ? 1 : -1;


  const sortedCabins = filterdCabins.sort((a, b) => {
    if (typeof a[field] === "string") {
      // Sort strings alphabetically
      return a[field].localeCompare(b[field]) * modifier;
    } else {
      // Sort numbers
      return (a[field] - b[field]) * modifier;
    }
  });


  // const sortedCabins = filterdCabins.sort(
  //   (a, b) => (a[field] - b[field]) * modifier
  // );

  // console.log(sortedCabins);


  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={cabins}
          // data={filterdCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />

        {/* <Suspense fallback={<Spinner />}></Suspense> */}
      </Table>
    </Menus>
  );
}

export default CabinTable;
