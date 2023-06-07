import React, { useEffect, useState } from "react";
import { Agent, Loading } from "../../Utils/importFiles";
import { makeStyles } from "@material-ui/core/styles";
import { SearchInput } from "./components/SearchInput";
import { BarberCard } from "./components/BarberCard";
import MapComp from "./components/MapComp";
import MapBoxComp from "./components/MapBoxComp";

import carppone from "../../Resources/Images/carppone.jpg";
import skills from "../../Resources/Images/skills.jpg";
import ercovoz from "../../Resources/Images/ercovoz.jpg";

import { Typography, Grid } from "@material-ui/core";

const Barbers = (props) => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const _getBarbers = () => {
    const splitUrl = props.location.search.split("=");
    const queryDistrict = splitUrl[1];
    if (queryDistrict) {
      Agent.Barbers.getFilterByDistrict()
        .send({ district: queryDistrict })
        .then((res) => {
          if (res.ok) {
            if (!res.body.Error) {
              setBarbers(res.body.data);
              setLoading(false);
              if (!res.body.data.length == 0) {
                setIsEmpty(true);
              } else {
                console.log("error", res.body.Message);
              }
            }
          }
        });
    } else {
      Agent.Barbers.getBarbers().then((res) => {
        if (res.ok) {
          if (!res.body.Error) {
            setBarbers(res.body.data);
            setLoading(false);
          } else {
            console.log("error");
          }
        }
      });
    }
  };

  useEffect(() => {
    //  _getBarbers();
    const barbers = [
      {
        id: 1,
        barberName: "Carppone Barberia",
        district: "San Isidro",
        adress: "Calle Schell 361, Miraflores",
        photo: carppone,
      },
      {
        id: 2,
        barberName: "Barberia Skills",
        district: "El Agustino",
        adress: "Avenida Gran Chimu 1056",
        photo: skills,
      },
      {
        id: 3,
        barberName: "Barberia Ercovoz",
        district: "San Martín de Porres",
        adress: "Av. Eduardo De Habich # 293",
        photo: ercovoz,
      },
    ];
    setBarbers(barbers);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <SearchInput />
      {!loading ? (
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-star"
        >
          {!isEmpty ? (
            <>
              <Grid item xs={12} sm={8} style={{ marginTop: "2em" }}>
                <Grid container spacing={4}>
                  {barbers.map((barber) => (
                    <Grid item xs={12}>
                      <BarberCard barber={barber}></BarberCard>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                style={{
                  marginTop: "2em",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  aligItems: "center",
                }}
              >
                <MapBoxComp />
              </Grid>
            </>
          ) : (
            <Loading emptyPage></Loading>
          )}
        </Grid>
      ) : (
        <Loading />
      )}
    </Grid>
  );
};
export default Barbers;
