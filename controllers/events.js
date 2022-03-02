const Event = require("../models/Event")

const getEvents = async(req, res) => {
    const events = await Event.all()

    return res.status(201).json({
        ok: true,
        data: events
    })
}

const createEvent = async(req, res) => {
    const {title, startDate, endDate, bgcolor, notes} = req.body;

    try{
        let event = await Event.findOne({id})

        if(event){
            return res.status(400).json({
                ok: false,
                msg: "event exists"
            })
        }

        event = new Event(req.body)

        return res.status(201).json({
            ok: true,
        })
    } catch(err) {
        res.status(500).json({
            ok: false,
            msg: 'Error on save new event',
        })

        console.log(err)
    }
}

const updateEvent = async(req, res) => {
    const {title, startDate, endDate, bgcolor, notes} = req.body;

    try{
        let event = await Event.findOne({id})

        if(!event){
            return res.status(400).json({
                ok: false,
                msg: "event exists"
            })
        }

        return res.status(201).json({
            ok: true,
        })
    } catch(err) {
        res.status(500).json({
            ok: false,
            msg: 'Error on save new event',
        })

        console.log(err)
    }
}

const deleteEvent = async(req, res) => {
    try{
        let event = await Event.findOne({id})

        if(!event){
            return res.status(400).json({
                ok: false,
                msg: "event not exists"
            })
        }

        event.delete();

        return res.status(201).json({
            ok: true,
        })
    } catch(err) {
        res.status(500).json({
            ok: false,
            msg: 'Error on delete event',
        })

        console.log(err)
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}